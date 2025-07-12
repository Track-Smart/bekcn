import { Context } from ".";

type BecknErrorCode =
    | "10000" | "10001" | "10002" | "10003" | "10004"
    | "20000" | "20001" | "20002" | "20003" | "20004"
    | "30000" | "30001" | "30002" | "30003" | "30004" | "30005"
    | "40000" | "40001" | "40002" | "40003"
    | "60001" | "60002" | "60003";

export interface BecknError {
    context: Context;
    error: {
        code: BecknErrorCode;
        message: string;
        type: string;
        details: any
    };
}
