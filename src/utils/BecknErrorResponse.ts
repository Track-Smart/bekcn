import { Context } from "../types";

const createBecknErrorContext = (city: string, action: string, bap_id: string, bap_uri: string) => {
    const now = new Date().toISOString();
    return {
        domain: 'nic2004:52110',
        country: 'IND',
        city: city,
        action: `on_${action}`,
        core_version: '1.0.0',
        bap_id: bap_id,
        bap_uri: bap_uri,
        transaction_id: '1234567890',
        message_id: 'msg-12345',
        timestamp: now,
    };
}

export const createBecknErrorResponse = (
    context: Context,
    errorCode: string,
    errorMessage: string[],
    errorType: string = 'ProtocolError',
) => {
    // const context = createBecknErrorContext(city, action, bap_id, bap_uri);

    return {
        context: context,
        error: {
            code: errorCode,
            message: errorMessage,
            type: errorType,
        }
    }
}
