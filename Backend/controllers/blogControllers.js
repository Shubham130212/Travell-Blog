const Blog = require('../models/blogModel.js');
const User = require('../models/userModel.js');
const multer = require('multer')
const uploadFile = require('../middlewares/multer.js')

const addBlog = async (req, res) => {
    try {
        const { title, description, user } = req.body;
        const existUser = await User.findById(user)
        if (!existUser) {
            return res.status(404).json({ error: "User not found" })
        }
        const newBlog = new Blog({
            title,
            description,
            user
        });
        const savedBlog = await newBlog.save();
        existUser.blogs.push(savedBlog);
        await existUser.save()
        res.status(201).json({ message: "Blog is added successfully" })

    }
    catch (error) {
        console.error('Error in addBlog controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 2
        const skip = (page - 1) * pageSize

        const blogs = await Blog.find()
            .sort({ updatedAt: 'desc' })
            .skip(skip)
            .limit(pageSize)

        if (blogs && blogs.length > 0) {
            res.status(200).send(blogs)
        }
        else {
            res.status(404).json({ error: "Blogs not found" })
        }
    }
    catch (error) {
        console.error('Error in getBlog controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getOneBlog = async (req, res) => {
    const objId = req.params.id;
    try {
        const getBlog = await Blog.findById(objId);
        if (getBlog) {
            res.status(200).send(getBlog)
        }
        else {
            res.status(404).json({ error: "Blog not found" })
        }
    }
    catch (error) {
        console.error('Error in getOneBlog controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const objId = req.params.id;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(objId, {
            title,
            description
        }, { new: true });

        if (updateBlog) {
            res.status(200).json({ MESSAGE: "Blog is updated successfully" })
        }
        else {
            res.status(404).json({ error: "Blog not found" })
        }
    }
    catch (error) {
        console.error('Error in updateBlog controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fileUpload = async (req, res) => {
    const objId = req.params.id;
    try {
        const existBlog = await Blog.findById(objId)

        if (!existBlog) {
            return res.status(404).json({ error: "Blog not found" })
        }
        uploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {    // multer validation error
                return res.status(400).json({ error: err.message });
            }
            else if (err) {
                return res.status(400).json({ error: err.message });  //uploading error
            }
            existBlog.image = req.file.path
            const savedImage = await existBlog.save();
            res.status(200).send(savedImage)
        })
    }
    catch (error) {
        console.error('Error in fileuplod controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteBlog = async (req, res) => {
    const objId = req.params.id;
    try {
        const deleteBlog = await Blog.findByIdAndDelete(objId).populate('user')
        await deleteBlog.user.blogs.pull(deleteBlog)
        await deleteBlog.user.save()
        if (deleteBlog) {
            res.status(200).json({ MESSAGE: "Blog is deleted successfully" })
        }
        else {
            res.status(404).json({ error: "Blog not found" })
        }
    }
    catch (error) {
        console.error('Error in deleteBlog controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { addBlog, getBlogs, getOneBlog, updateBlog, fileUpload, deleteBlog }