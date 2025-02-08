import { PartialType } from "@nestjs/swagger";
import { Units } from "../schema/unit.schema";

export class UnitsPayload extends PartialType(Units) {
    createdAt?: string;
    updatedAt?: string;
}