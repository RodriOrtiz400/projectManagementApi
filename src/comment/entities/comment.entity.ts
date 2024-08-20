import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from '../../task/entities/task.entity';
import { Project } from '../../project/entities/project.entity';

@Schema({ timestamps: true })
export class Comment extends Document {

  @Prop({ required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: false })
  task: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: false })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
