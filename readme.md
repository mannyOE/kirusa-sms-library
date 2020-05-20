# kirusa-sms-library

This is a nodejs module to fast track the use of the kirusa api library.

## Installation

```bash
npm install kirusa-sms-library
```

## Usage

```Node js
const Kirusa = require('kirusa-sms-library')

var kirusa = new Kirusa(
kirusa_api_key,
    kirusa_account_id,
    kirusa_sender_number,
    country_phone_code,
    mask
)
```
## Format your phone numbers

```
var formatted_numbers = kirusa.format_numbers(['+2348144821911']);
```


## send sms to many or to one phone number

```
var response = await kirusa.send_single(message, formatted_numbers);

OR

var response = await kirusa.send_multiple(message, formatted_numbers);
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
