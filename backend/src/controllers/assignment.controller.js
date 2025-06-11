import {Assignment} from '../models/assignment.model.js';
import {ClassModel} from '../models/class.model.js';




export const saveGrade = async (req, res) => {
  const { studentId, classId, grade } = req.body;

  try {
    // Check if record exists
    let assignment = await Assignment.findOne({ student: studentId, classId });

    if (assignment) {
      // Update existing
      assignment.grade = grade;
      await assignment.save();
    } else {
      // Create new
      assignment = new Assignment({
        student: studentId,  // ✅ match schema key
        classId,
        grade,
      });

      await assignment.save();
    }

    res.status(200).json({ message: 'Grade saved successfully', assignment });
  } catch (error) {
    console.error('Error saving grade:', error);
    res.status(500).json({ error: 'Failed to save grade' });
  }
};





export const getClassSubmissions = async (req, res) => {
  const { classId } = req.params;

  try {
    // Find all students who submitted
    const submissions = await Assignment.find({ classId }).populate({
      path: "studentId",
      model: "User", // explicitly tell Mongoose to use the User model
      select: "username email",
    });
    

    res.status(200).json({
      message: "Fetched class submissions successfully",
      data: submissions
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch submissions", error: err.message });
  }
};













export const getAssignmentsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const assignments = await Assignment.find({ classId }).populate('studentId');
    res.status(200).json({ assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};













export const getClassAssignments = async (req, res) => {
  try {
    const classId = req.params.classId;

    const classData = await ClassModel.findById(classId).populate('students', 'name email');
    if (!classData) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const responseData = [];

    for (const student of classData.students) {
      const assignment = await Assignment.findOne({
        classId: classId,
        student: student._id,
      });

      responseData.push({
        student,
        assignment: assignment
          ? {
              fileUrl: assignment.fileUrl,
              uploadedAt: assignment.uploadedAt,
              grade: assignment.grade
                
            }
          : null,
      });
    }

    res.status(200).json({ success: true, students: responseData });
  } catch (err) {
    console.error('Error fetching class assignments:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



export const getStudentGradesForClass = async (req, res) => {
  const classId = req.params.classId;

const assignments = await ClassModel.find({ classId }).populate('student', 'username'); // populate student username only

const studentsWithGrades = assignments.map(a => ({
  _id: a.students._id,
  username: a.students.username,
  assignment: a.fileUrl || null,
  grade: a.grade || null,
}));

res.json({ students: studentsWithGrades });
}