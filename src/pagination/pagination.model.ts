// import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
// import { IsNumber, IsOptional } from 'class-validator';
import {
  ClassType,
  IPaginationData,
  IPaginationQuery,
} from './pagination.interface';

// @ObjectType()
export class PaginationQuery implements IPaginationQuery {
  // @Field(() => Int)
  pageNo: number;

  // @Field(() => Int)
  pageSize: number;
}

// @InputType()
export class PaginationQueryInput implements IPaginationQuery {
  // @IsOptional()
  // @IsNumber({ maxDecimalPlaces: 0 })
  // @Field(() => Int, { nullable: true, defaultValue: 1 })
  pageNo: number;

  // @IsNumber({ maxDecimalPlaces: 0 })
  // @Field(() => Int, { nullable: true, defaultValue: 20 })
  pageSize: number;
}

export const PaginationData = <TItem>(TItemClass: ClassType<TItem>) => {
  // @ObjectType({ isAbstract: true })
  abstract class PaginationDataClass implements IPaginationData<TItem> {
    // @Field(() => [TItemClass])
    data: TItem[];

    // @Field(() => Int)
    count: number;

    // @Field(() => PaginationQuery)
    query: IPaginationQuery;
  }

  return PaginationDataClass as ClassType<IPaginationData<TItem>>;
};
