const express = require("express");
var router = express.Router();

const accept = require("../acceptance");

// Load Job model
const Job = require("../models/Jobs");
const User = require("../models/Users");

// Getting all the jobs
router.get("/", function(req, res) {
    Job.find(function(err, jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});

// Add a job to db
router.post("/register", async (req, res) => {
    try
    {   
        const newJob = new Job({
            title: req.body.title,
            name: req.body.name,
            email: req.body.email,
            maxApplicants: Number(req.body.maxApps),
            maxPositions: Number(req.body.maxPos),
            noOfAccepted: 0,
            deadline: Date.parse(req.body.deadline),
            skills: req.body.skills,
            typeOfJob: req.body.jobType,
            duration: Number(req.body.duration),
            salary: Number(req.body.salary),
            rating: 0
        });

        newJob
            .save()
            .then(job => res.status(200).json(job))
            .catch(err => {res.send(err);console.log(err);});
    }

    catch (err) 
    {
        console.log(err.message);
        res.status(500).send("Error: Job Listing could not be created");
    }
});

router.post("/addApp/:id", async (req, res) => {
  try
  {
    Job.findById(req.params.id)
       .then(job => {
          job.receivedApplicants.push({
            _id: req.body._id,
            email: req.body.email, 
            sop: req.body.sop, 
            status: "Applied",
            dateOfApplication: Date.parse(new Date())
          })

          job
            .save()
            .then(job => res.status(200).json(job))
            .catch(err => {res.send(err);console.log(err);});
       })
       .catch(err => res.status(400).json('Error: ' + err));
  }

  catch (err) 
  {
      console.log(err.message);
      res.status(500).send("Error: Job Listing could not be updated");
  }
});

router.post("/updateStatus/:id", async (req, res) => {
  try
  {
    Job.findById(req.params.id)
       .then(job => {
          job.receivedApplicants.map((getjob) => (
            getjob._id == req.body.jobId ? getjob.status = req.body.status : getjob.status,
            getjob._id == req.body.jobId && req.body.status === "Accepted" ? accept(getjob, job.name) : "",
            getjob._id == req.body.jobId && req.body.status === "Accepted" ? getjob.dateOfJoining = Date.parse(new Date()) : ""
          ))

          if (req.body.status === "Accepted")
          {
            job.noOfAccepted += 1;

            User.findById(req.body.jobId)
                .then(user => {
                    user.jobsApplied.map((appliedJob) => (
                        appliedJob._id != req.params.id ? 
                        Job.findById(appliedJob._id)
                            .then(foundJob => {
                                foundJob.receivedApplicants.map((getjob) => (
                                    getjob._id == req.body.jobId ? getjob.status = "Rejected" : ""
                                ))
                                foundJob.save()
                            }) 
                        : ""
                    ))
                  user.save()
                })
          }
          
          if (req.body.status === "Rejected")
          {
            job.noOfAccepted -= 1
          }

          job
            .save()
            .then(job => res.status(200).json(job))
            .catch(err => {res.send(err);console.log(err);});
       })
       .catch(err => res.status(400).json('Error: ' + err));
  }

  catch (err) 
  {
      console.log(err.message);
      res.status(500).send("Error: Job Listing could not be updated");
  }
});

router.get("/checkAccepted/:id", async (req, res) => {  
  try
  {
    var accepted = 0;

    const user = await User.findById(req.params.id);

    if(user)
    {
      for(var j = 0; j < user.jobsApplied.length; j++)
      {
        const foundJob = await Job.findById(user.jobsApplied[j]._id)
        
        if(foundJob)
        {
          for(var i = 0; i < foundJob.receivedApplicants.length; i++)
          {
            if(foundJob.receivedApplicants[i]._id == req.params.id && foundJob.receivedApplicants[i].status == "Accepted")
            {
              accepted = 1;
            }
          }  
        }
      }    
    }
        
    return res.status(200).json({gotAccepted: accepted});    
  }

  catch (err) 
  {
      console.log(err.message);
      res.status(500).send("Error: User not found");
  }
});

router.post("/editJob/:id", async (req, res) => {
  try
  {
    Job.findById(req.params.id)
       .then(job => {
            req.body.maxApps ? job.maxApplicants = req.body.maxApps : job.maxApplicants,
            req.body.maxPos ? job.maxPositions =req.body.maxPos : job.maxPositions,
            req.body.deadline ? job.deadline = req.body.deadline : job.deadline,
            req.body.rating ? job.rating = (job.rating+req.body.rating)/2 : job.rating

          job
            .save()
            .then(job => res.status(200).json(job))
            .catch(err => {res.send(err);console.log(err);});
       })
       .catch(err => res.status(400).json({ error: err }));
  }

  catch (err) 
  {
      console.log(err.message);
      res.status(500).json({error: "Error: Job details could not be updated"});
  }
});

router.post("/deleteJob/:id", async (req, res) => {
  try
  {
    Job.findById(req.params.id)
       .then(job => {
            job.receivedApplicants.map((getjob) => (
                User.findById(getjob._id)
                    .then(user => {
                        jobIndex = user.jobsApplied.findIndex((jobapp) => jobapp._id == req.params.id)
                        
                        if(jobIndex)
                        {
                          user.jobsApplied.splice(jobIndex, 1);
                          user.save()
                        }
                    })
            ))
       })
       .catch(err => res.status(400).json({ error: err }));

    Job.findByIdAndDelete(req.params.id)
       .then(() => res.status(200).json('Job deleted.'))
       .catch(err => res.status(400).json({ error: err }));
  }

  catch (err) 
  {
      console.log(err.message);
      res.status(500).json({error: "Error: Job could not be deleted"});
  }
});

router.get("/getJob/:id", async (req, res) => {
  try 
  {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } 
  
  catch (e) 
  {
    res.send({ message: "Error in fetching job" });
  }
});

router.post("/getJobs", async (req, res) => {
  try 
  {
    var jobs = [];
    
    for(var i = 0; i < req.body.jobIds.length; i++)
    {
      const job = await Job.findById(req.body.jobIds[i]);
      jobs.push(job);
    }

    res.status(200).json({jobs: jobs});
  } 
  
  catch (e) 
  {
    res.send({ message: "Error in fetching job" });
  }
});

module.exports = router;
