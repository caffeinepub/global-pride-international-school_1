import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdmissionEnquiry {
    id: bigint;
    studentName: string;
    gradeApplying: string;
    message: string;
    timestamp: Time;
    contactNumber: string;
    parentName: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllEnquiries(): Promise<Array<AdmissionEnquiry>>;
    getEnquiryById(id: bigint): Promise<AdmissionEnquiry>;
    submitEnquiry(studentName: string, parentName: string, contactNumber: string, gradeApplying: string, message: string): Promise<bigint>;
}
