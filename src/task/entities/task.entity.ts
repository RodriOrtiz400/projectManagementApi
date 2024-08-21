import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from '../../interfaces';

@Schema()
export class Task extends Document {
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

export const TaskSchema = SchemaFactory.createForClass(Task);
