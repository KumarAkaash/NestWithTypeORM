import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('float')
  price: number;

  @Column('int')
  quantity: number;

  @Column({ default: true })
  status: boolean;
}
