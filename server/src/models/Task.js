import mongoose from 'mongoose';
import { TASK_STATUSES } from '../constants.js';

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    status: {
      type: String,
      required: true,
      enum: TASK_STATUSES,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.project) {
          ret.projectId = ret.project.toString();
          delete ret.project;
        }
        return ret;
      },
    },
  },
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
