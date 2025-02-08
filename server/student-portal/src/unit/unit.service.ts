import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Units } from './schema/unit.schema';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitsPayload } from './dto/unit-payload';

@Injectable()
export class UnitService {
    constructor(@InjectModel(Units.name) private unitsModel:Model<Units>){}

    async createUnit(body: CreateUnitDto): Promise<UnitsPayload> {
        const newUnit = new this.unitsModel(body);
        const unit = await newUnit.save();
        
        return unit;
    }

    async getUnits(): Promise<UnitsPayload[]>{
        const units = await this.unitsModel.find();

        return units;
    }

    async getUnit(id: string): Promise<UnitsPayload>{
        const unit = await this.unitsModel.findById({ _id: id })
        if (!unit) {
            throw new NotFoundException(`Unit with id:${id} not found `);
        }
        
        return unit;
    }

    async updateUnit(id: string, body: UpdateUnitDto): Promise<UnitsPayload>{
        await this.unitsModel.updateOne({ _id: id }, body);

        const updatedUnit = await this.unitsModel.findById(id);

        if (!updatedUnit) {
            throw new NotFoundException(`Unit with id:${id} not found `);
        }

        return updatedUnit;
    }

    async deleteUnit(id: string) {
        await this.unitsModel.deleteOne({ _id: id });
    }
    
}

