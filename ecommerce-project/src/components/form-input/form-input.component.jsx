import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
	<div className="group">
		<input className="form-input" onChange={handleChange} {...otherProps} />
		{/* If we decide that the FormInput will have a label or don't specify it */
		label ? (
			<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
				{label}
			</label>
		) : null}
	</div>
);

export default FormInput;
