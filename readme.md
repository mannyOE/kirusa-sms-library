# kirusa-sms

This is a nodejs module to fast track the use of the kirusa api library.

## Installation

```bash
npm install kirusa-sms
```

## Usage

```Node js
const Kirusa = require('kirusa-sms')

var kirusa = new Kirusa(
    kirusa_api_key,
    kirusa_account_id,
    kirusa_sender_number,
    country_phone_code,
    mask
)

Every instance of Kirusa can support only one country code.

```

## Properties

| Paramter             | Description                                                       | Required | Default |
| -------------------- | ----------------------------------------------------------------- | -------- | ------- |
| kirusa_api_key       | the api key from your kirusa account                              | true     | -       |
| kirusa_account_id    | your account id                                                   | true     | -       |
| kirusa_sender_number | your kirusa registered sender phone number (short or long number) | true     | -       |
| country_phone_code   | country code of the valid phone numbers you wish to send to       | true     | +234    |
| mask                 | your account sender mask                                          | false    | -       |

## Format your phone numbers

```
var formatted_numbers = kirusa.format_numbers(['+2348144821911', '+2219035400223']);

formatted_numbers = {
    valid: ['+2348144821911'],
    invalid: ['+2219035400223']
}
```

## send sms to many or to one phone number

```
var response = await kirusa.send_single(message, '+2348144821911');

OR

var response = await kirusa.send_multiple(message, formatted_numbers.valid);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
