import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Status } from '../../interfaces';

@Schema()
export class Project extends Document {
  @Prop({
    required: true,
    index: true,
  })
  title: string;

  @Prop()
  description: string;

  @Prop()
  due_date: Date;

  @Prop({
    required: true,
    index: true,
    enum: Status,
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignTo: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
