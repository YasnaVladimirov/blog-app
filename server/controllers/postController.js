const models = require("../models");

const getAllPosts = async (req, res) => {
  try {
    const cat = req.query.cat;

    let posts, category;
    if (cat) {
      category = await models.Category.findOne({ where: { name: cat } });
      posts = await models.Post.findAll({ where: { categoryId: category.id } })
    } else {
      posts = await models.Post.findAll()
    }

    if (!posts) return res.status(400).json({ error: "Error fetching posts!" });
    res.status(200).json(posts.map(post => {
      return postInfo = {
        id: post.id,
        title: post.title,
        description: post.description,
        img: post.img
      }
    }));

  } catch (error) {
    console.log("Error getting all posts,", error);
    return res.status(400).json({ error: "Error getting all posts," + error })
  }
}

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required!" });

    const post = await models.Post.findOne({ where: { id } });
    if (!post) return res.status(400).json({ error: "Error fetching this post!" });

    const user = await models.User.findOne({ where: { id: post.UserId } });
    if (!user) return res.status(400).json({ error: "User not found!" });

    const category = await models.Category.findOne({ where: { id: post.CategoryId } });
    if (!category) return res.status(400).json({ error: "Category is missing!" });

    const postInfo = {
      id: post.id,
      title: post.title,
      description: post.description,
      postImg: post.img,
      date: post.createdAt,
      username: user.username,
      userImg: user.img,
      category: category.name
    }

    res.status(200).json(postInfo);
  } catch (error) {
    console.log("Error getting all posts,", error);
    return res.status(400).json({ error: "Error getting all posts," + error })
  }
}

const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.userId;
    const image = req.file;

    if (!title || !description || !image || !category || !userId) return res.status(400).json({ error: "Invalid or missing data!" });

    const foundCategory = await models.Category.findOne({ where: { name: category } });
    if (!foundCategory) return res.status(400).json({ error: "Invalid category data!" });

    const result = await models.Post.create({
      title: title,
      description: description,
      img: image.filename,
      UserId: userId,
      CategoryId: foundCategory.id
    })

    return res.status(200).json({ post: result });
  } catch (error) {
    console.log("Error creating post,", error);
    return res.status(400).json({ error: "Error creating post," + error })
  }
}

const updatePost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const image = req.file;
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Invalid or missing data!" });

    const post = await models.Post.findOne({ where: { id } });
    if (!post) return res.status(400).json({ error: "Post not found" });

    if (category) {
      const foundCategory = await models.Category.findOne({ where: { name: category } });
      if (!foundCategory) return res.status(400).json({ error: "Invalid category data!" });

      post.CategoryId = foundCategory.id;
    }
    if (title) post.title = title;
    if (description) post.description = description;
    if (image) post.img = image.filename;

    await post.save();

    return res.status(200).json({ post });
  } catch (error) {
    console.log("Error creating post,", error);
    return res.status(400).json({ error: "Error creating post," + error })
  }
}

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await models.Post.destroy({ where: { id } });
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.log("Error deleting post,", error);
    return res.status(400).json({ error: "Error deleting post," + error })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost
}