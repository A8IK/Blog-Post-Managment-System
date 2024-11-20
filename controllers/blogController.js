const BlogPost = require('../models/blogPost');

exports.createBlog = async (req, res) => {
  console.log("Inside createBlog function");
  console.log("Request body:", req.body);

  try {
    const { title, content, createdAt } = req.body;

    if (!title || !content) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "Title and content are required" });
    }

    if (!req.user || !req.user.userId) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const author = req.user.userId; // Automatically set author from the logged-in user

    let parsedDate;
    if (createdAt) {
      const [day, month, year] = createdAt.split('.');
      parsedDate = new Date(`${year}-${month}-${day}`);
      if (isNaN(parsedDate)) {
        console.log("Invalid date format");
        return res.status(400).json({ message: "Invalid date format for createdAt. Use 'dd.mm.yyyy'" });
      }
    }

    const newPost = new BlogPost({
      title,
      content,
      author,
      ...(parsedDate && { createdAt: parsedDate })
    });

    await newPost.save();
    console.log("New post created:", newPost);
    res.status(201).json(newPost);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog post' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving post' });
  }
};

exports.updateBlogById = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const post = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: 'Post not found or not authorized' });
    res.json(post);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post' });
  }
};

// exports.deleteBlogById = async (req, res) => {
//   try {
//     if (!req.user || !req.user.userId) {
//       console.log("User not authenticated");
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const post = await BlogPost.findOneAndDelete({ _id: req.params.id, author: req.user.userId });

//     if (!post) return res.status(404).json({ message: 'Post not found or not authorized' });
//     res.json({ message: 'Post deleted successfully' });
//   } 
//   catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error deleting post' });
//   }
// };

exports.deleteBlogById = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const post = await BlogPost.findOneAndDelete({ _id: req.params.id, author: userId });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
};


