import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Foo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bar: string;
}
