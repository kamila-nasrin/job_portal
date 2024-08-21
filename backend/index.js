// Import dependencies
const express = require('express');
// const cors = require('cors');
const multer = require('multer');
require("./connection")
const path = require('path');
const fs = require('fs'); // Import fs for file operations
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();


// const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify token


// Import models
const JobModel=require('./models/jobs.js');
const UserModel = require('./models/UserModel');
const AppliedJobModel = require('./models/AppliedJobModel');
const SavedJobModel = require('./models/SavedJobModel');





// Initialize
var app = express();



//middleware
app.use(express.json());
var cors = require('cors');

app.use(cors())

//API  

app.get('/', (req, res) => {
    res.send("message for trail")
})
app.get('/welcome', (req, res) => {
    res.send("message for trail")
})


app.use('/uploads', express.static('uploads'));



const adminCredentials = {
    username:'admin',
    password:'admin123'
};

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
    }
});

const upload = multer({ storage: storage });

app.post('/register', upload.fields([{ name: 'photo' }, { name: 'resume' }]), async (req, res) => {
    try {
        const { fullname, email, username, password, place, age, qualification } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
        const resume = req.files['resume'] ? req.files['resume'][0].filename : null;

        const user = new UserModel({
            fullname,
            email,
            username,
            password: hashedPassword,
            place,
            age,
            qualification,
            photo,
            resume
        });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if admin
    if (username === adminCredentials.username) {
        if (password === adminCredentials.password) {
            return res.send({ message: 'Login successful', role: 'admin' });
        } else {
            return res.status(400).send({ message: 'Invalid admin credentials' });
        }
    }

    // Check if user
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        res.send({ message: 'Login successful', role: 'user' ,userId:user._id});
    } catch (error) {
        console.error('Error logging in:', error); // Debugging step
        res.status(400).send({ message: 'Error logging in', error: error.message });
    }
});

// API to save a job for a user
app.post('/save-job', async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        const existingSave = await SavedJobModel.findOne({ userId, jobId });
        if (existingSave) {
            return res.status(400).json({ success: false, message: 'Job already saved.' });
        }

        const savedJob = new SavedJobModel({ userId, jobId });
        await savedJob.save();

        res.status(201).json({ success: true, message: 'Job saved successfully.' });
    } catch (error) {
        console.error(`Error saving job for user ${userId}, job ${jobId}:`, error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.get('/saved-jobs/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if JobModel is properly imported and used
        console.log('JobModel:', JobModel);

        const savedJobs = await SavedJobModel.find({ userId })
            .populate('jobId').exec();
        res.status(200).json(savedJobs);
    } catch (error) {
        console.error('Error fetching saved jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

















// API to apply for a job
app.post('/apply', async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        // Check if the job is already applied for by the user
        const alreadyApplied = await AppliedJobModel.findOne({ userId, jobId });
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job.' });
        }

        // Create a new application record
        const application = new AppliedJobModel({ userId, jobId });
        await application.save();

        res.status(200).json({ message: 'Job applied successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/applied-jobs/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const appliedJobs = await AppliedJobModel.find({ userId })
            .populate('jobId') // Ensure this matches your JobModel schema
            .exec();
        
        console.log('Fetched applied jobs:', appliedJobs); // Log the fetched jobs
        res.status(200).json(appliedJobs);
    } catch (error) {
        console.log('Error fetching applied jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// API to get all applied jobs with user and job details (Admin)
app.get('/admin/viewApplications', async (req, res) => {
    try {
        const applications = await AppliedJobModel.find()
            .populate('userId', 'fullname email')  // Populates user details
            .populate('jobId', 'Jobtitle Cmpyname Des Req Loc Sal Jobtype Industry');  // Populates job details
        
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// module.exports = router;


// // In your backend (e.g., profile route)
// app.get('/user/profile', async (req, res) => {
//     try {
//       const token = req.headers['authorization']?.split(' ')[1];
//       if (!token) return res.status(401).json({ message: 'No token provided' });
  
//       const decoded = jwt.verify(token, 'your_jwt_secret'); // Adjust this as needed
//       const userId = decoded.id;
  
//       const user = await UserModel.findById(userId).select('username email');
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  








//CURD Operations
//add data api
app.post("/add", async (req, res) => {
    try {
        await JobModel(req.body).save();
        res.send({message:"Data added"})
    } catch (error) {
        console.log(error)
        
    }
})

// view data api
app.get("/view", async (req, res) => {
    try {
        const result = await JobModel.find();
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})


// Get count of available jobs
app.get('/countAvailableJobs', async (req, res) => {
    try {
        const count = await JobModel.countDocuments();
        res.json({ count });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching job count');
    }
});

// Get count of applied jobs for a specific user
app.get('/countAppliedJobs/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Ensure userId is valid and not null
        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const count = await AppliedJobModel.countDocuments({ userId: userId });
        res.json({ count });
    } catch (error) {
        console.error('Error counting applied jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// app.get('/admin/viewApplications', async (req, res) => {
//     try {
//         const applications = await AppliedJobModel.find()
//             .populate('userId', 'fullname email')
//             .populate('jobId', 'Jobtitle Cmpyname')
//             .exec();

//         console.log('Fetched Applications:', applications);  // Log fetched applications
//         res.status(200).json(applications);
//     } catch (error) {
//         console.error('Error fetching applications:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
















// delete data api
app.delete("/remove/:id", async (req, res) => {
    try {
        await JobModel.findByIdAndDelete(req.params.id)
        res.send(({message: 'deleted successfully'}))
    } catch (error) {
        
        console.log(error)
        
    }
})

//update data api
app.put("/update/:id", async (req, res) => {
    try {
        var data=await JobModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.send(({ message: 'updated successfully' ,data}))
    } catch (error) {

        console.log(error);

    }
})


//Port
app.listen(3006, () => {
    console.log("port is up")
});