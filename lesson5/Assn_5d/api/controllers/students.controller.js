// require("./addresses.controller");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
  console.log("Get the Students list");
  console.log(req.query);
  let offset = 0;
  let count = 4;
  const maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString Offset and Count must be a number" });
    return;
  }
  if (count > maxCount) {
    res
      .status(400)
      .json({ message: "QueryString Count must not exceed " + maxCount });
  } else {
    Student.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, students) {
        if (err) {
          console.log("Error: ", err);
          res.status(500).json(err);
        } else {
          console.log("Found students", students);
          res.status(200).json(students);
        }
      });
  }
};

module.exports.studentGetOne = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    console.log("GET student with studentId", studentId);
    const response = {
      status: 200,
      message: student,
    };
    if (err) {
      console.log("Error finding student: " + studentId);
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = "Student ID not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.studentAdd = function (req, res) {
  console.log("Add new student");
  const response = {
    status: 201,
    message: "",
  };
  if (req.body && req.body.name && req.body.gpa) {
    console.log(req.body);

    const newStudent = {};
    newStudent.name = req.body.name;
    newStudent.gpa = parseFloat(req.body.gpa);
    
    Student.create(newStudent, function (err, game) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        console.log("Student created", newStudent);
        response.status = 201;
        response.message = newStudent;
      }
    });
  } else {
    console.log("Data missing from POST body");
    response.status = 400;
    response.message = { message: "Request data missing from POST body" };
    res.status(response.status).json(response.message);
  }
};

module.exports.studentFullUpdate = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    const response = {
      status: 204,
      message: student,
    };
    if (err) {
      console.log("Error finding student ", studentId);
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = { message: "Student ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      student.name = req.body.name;
      student.gpa = req.body.gpa;
      
      student.save(function (err, updatedStudent) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = { message: "updatedStudent" };
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.studentPartialUpdate = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    const response = {
      status: 204,
      message: student,
    };
    if (err) {
      console.log("Error finding student", studentId);
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = { message: "Student ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.name) {
        student.name = req.body.name;
      }
      if (req.body.gpa) {
        student.gpa = req.body.gpa;
      }
      student.save(function (err, updatedStudent) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = updatedStudent;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.studentDelete = function (req, res) {
  console.log("Delete a student record");
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId).exec(function (err, deletedStudent) {
    const response = {
      status: 204,
      message: deletedStudent,
    };
    if (err) {
      console.log("Error finding student", gameId);
      response.status = 500;
      response.message = err;
    } else if (!deletedStudent) {
      response.status = 404;
      response.message = { message: "Student record not found" };
    }
    res.status(response.status).json(response.message);
  });
};
