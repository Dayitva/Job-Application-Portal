module.exports.validateUserInput = (
	email,
  name,
  role,
	password,
  confirmPassword,
) => {
    const errors = {};
    const nameRegEx= /[`!_@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const strongRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})");
    // const contactRegEx = new RegExp('^\\d+$');

    if(name.trim() === '')
    {
      errors.name = 'Name must not be empty!';
    }

    else if(name.match(nameRegEx))
    {
      errors.name = 'Name must not contain any special characters!';
    }
    
    if(role === '')
    {
      errors.role = 'You must choose a role!';
    }

    if(email.trim() === '')
    {
		  errors.email = 'Email must not be empty!';
	  }
    
    else if (!email.match(emailRegEx)) 
    {
      errors.email = 'Email must be a valid email address!';
    }
    
    if (password === '') 
    {
    	errors.password = 'Password field must not be empty!';
    }

    else if(!password.match(strongRegEx))
    {
		  errors.password = 'Weak password, must contain atleast 8 characters and 1 capital letter!';
    }

    if (confirmPassword === '') 
    {
    	errors.confirmPassword = 'Confirm Password field must not be empty!';
    }

    else if (password !== confirmPassword) 
    {
    	errors.confirmPassword = 'Passwords must be the same!';
    }

  	return {
      errors,
      valid: Object.keys(errors).length < 1
    };
};

module.exports.validateRecruiterInput = (
	contact,
) => {
    const errors = {};  
    const contactRegEx = new RegExp('^\\d+$');

    if (contact === '') 
    {
    	errors.contact = 'Contact field must not be empty';
    }

    else if(!contact.match(contactRegEx))
    {
		  errors.contact = 'Contact No can only contain digits from 0 to 9';
    }

    else if(contact.length != 10)
    {
		  errors.contact = 'Contact No must only contain 10 digits';
    }

  	return {
      errors,
      valid: Object.keys(errors).length < 1
    };
};

module.exports.validateApplicantInput = (
  institution,
  startYear,
  endYear
) => {
    const errors = {};  
    const numberRegEx = new RegExp('^\\d+$');

    if (institution === '') 
    {
    	errors.institution = 'Institution field must not be empty';
    }

    if (startYear === '') 
    {
    	errors.startYear = 'Start Year field must not be empty';
    }

    else if(!startYear.match(numberRegEx))
    {
		  errors.startYear = 'Start Year can only contain digits from 0 to 9';
    }

    if (endYear !== '') 
    {
      if(!endYear.match(numberRegEx))
      {
        errors.endYear = 'End Year can only contain digits from 0 to 9';
      }

      else if (startYear > endYear) 
      {
        errors.endYear = 'End Year must be greater than Start Year';
      }
    }

  	return {
      errors,
      valid: Object.keys(errors).length < 1
    };
};