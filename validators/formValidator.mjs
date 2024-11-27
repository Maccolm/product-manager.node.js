class FormValidator {
	static formSchema = {
		title: {
			notEmpty: {
				errorMessage: "Title is required",
			},
			isLength: {
				options: { min: 3 },
				errorMessage: "Username must be at least 3 characters long",
			},
			trim: true,
			escape: true,
		},
		amount: {
			notEmpty: {
				errorMessage: "Amount is required",
			},
			isNumeric: {
				errorMessage: "Must be a number",
			},
			trim: true,
			escape: true,
		},
		price: {
			notEmpty: {
				errorMessage: "Price is required",
			},
			isNumeric: {
				errorMessage: "Must be a number",
			},
			trim: true,
			escape: true,
		},
		including: {
			notEmpty: {
				errorMessage: "Components is required",
			},
			trim: true,
			escape: true,
		},
		numStems: {
			notEmpty: {
				errorMessage: "Number of stems is required",
			},
			trim: true,
			escape: true,
			isNumeric: {
				errorMessage: "Must be a number",
			},
			trim: true,
			escape: true,
		},
	// 	imgSrc: {
	// 		custom: {
	// 			 options: (value, { req }) => {
	// 				  if (!req.file) {
	// 						throw new Error('Image file is required');
	// 				  }
	// 				  return true;
	// 			 },
	// 		},
	//   },
	}
}

export default FormValidator;
