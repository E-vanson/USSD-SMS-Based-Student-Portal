import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common';

import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller({path: 'units', version: '1'})
export class UnitController {
    constructor(private unitsService: UnitService) { }
    
    @Get()
    getUnits() {
        return this.unitsService.getUnits();
    }

    @Get('/:id')
    getAdmin(@Param('id') id: string) {
        return this.unitsService.getUnit(id);
    }

    @Post()
    createUnit(@Body() body: CreateUnitDto) {
        return this.unitsService.createUnit(body);
    }

    @Put('/:id')
    updateUnit(@Param('id') id: string, @Body() body: UpdateUnitDto) {
        return this.unitsService.updateUnit(id, body);
    }

    @Delete('/:id')
    deleteUnit(@Param('id') id: string) {
        return this.unitsService.deleteUnit(id);
    }

}
