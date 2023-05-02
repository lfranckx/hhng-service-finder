import {ok, created, notFound, serverError} from 'wix-http-functions';
import wixData from 'wix-data';

export async function get_stylistsAPI(request) {
    const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };

    try {
        const results = await wixData.query("Stylists").find(options);
        const stylists = results.items.map(item => {
            return {
                firstName: item.firstName,
                lastName: item.lastName,
                phone: item.phone,
                email: item.email,
                streetAddress: item.streetAddress,
                city: item.city,
                regionStateProvince: item.regionStateProvince,
                country: item.country,
                postalZipCode: item.postalZipCode,
                longAnswerField: item.paragraphField,
                shortAnswerField: item.shortAnswerField
            };
        });

        const response = ok({ body: { stylists } });
        response.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://lfranckx.github.io",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With", 
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        };

        return response;
    } catch (error) {
        console.error(error);
        const response = serverError({ body: { error: error.message } });
        response.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://lfranckx.github.io",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With", 
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        };

        return response;
    }
}