import Ajv from 'ajv';
import AjvFormats from 'ajv-formats';

// configure all options here..
const ajvInstance = new Ajv({ allErrors: true });
AjvFormats(ajvInstance);

export default ajvInstance;
