import { Abum } from "src/modules/abum/entities/abum.entity";
import { Category } from "src/modules/categories/entities/category.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("image")
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    url: string

    @Column()
    name: string
    
    @Column()
    category_id: number

    @Column()
    abum_id: number

    @Column({default: false})
    favorite: boolean
    
    @Column({default: true})
    is_active: boolean

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne((type) => Abum, (abum) => abum.images)
    @JoinColumn({name: "abum_id"})
    abum: Abum

    @OneToOne(type=> Category, cate => cate.images)
    @JoinColumn({name: "category_id"})
    category: Category
}