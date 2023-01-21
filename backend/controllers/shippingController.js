const shippo = require('shippo')(process.env.SHIPPO_API_KEY);

const calculateShipping = async (req, res) => {
    const { firstName, lastName, company, address, apt, city, state, zip, phone } = req.body.shipping
    const fromAddress = {
        "name": "John Doe",
        "street1": "1234 Elm Street",
        "city": "Anytown",
        "state": "NY",
        "zip": "12345",
        "country": "US",
        "phone": "555-555-5555"
    };
    const toAddress = {
        "name": `${firstName} ${lastName}`,
        "street1": address,
        "city": city,
        "state": state,
        "zip": zip,
        "country": "US",
        "phone": phone
    };
    const parcel = [{
        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": "2",
        "mass_unit": "lb"
    }];
    try {
        const shipment = await shippo.shipment.create({
            "object_purpose": "PURCHASE",
            "address_from": fromAddress,
            "address_to": toAddress,
            "parcels": parcel,
            "async": true
        });
        const filteredRates = shipment.rates.filter(rate => rate.provider === "USPS" && (rate.servicelevel.token === "usps_priority" || rate.servicelevel.token === "usps_priority_express" || rate.servicelevel.token === "usps_parcel_select"))
        const filteredRatesObject = filteredRates.map(rate => ({
            provider: rate.provider,
            service_level: rate.servicelevel.name,
            amount: rate.amount,
            estimated_days: rate.estimated_days
        }));
        res.status(200).json(filteredRatesObject)
    } catch (error) {
        res.status(400).json(error)
    }

}

module.exports = { calculateShipping }
