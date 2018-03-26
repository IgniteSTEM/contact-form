import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import {withFormik, Form, Field } from 'formik';
import Yup from 'yup';

	const App = ({
		values,
		errors,
		touched,
		isSubmitting
	}) => (
		<Form>
			<Field type="text" name="firstname" placeholder="First Name"/>
			<br />
			<Field type="text" name="lastname" placeholder="Last Name"/>
			<br />
			<br />
			<div>
				{ touched.email && errors.email && <p>{errors.email}</p> }
	    		<Field type="email" name="email" placeholder="Email" />
	    	</div>
	    	<br />
	    	<div>
	    		{ touched.textarea && errors.textarea && <p> {errors.textarea}</p>}
	    		<Field type="textarea" name="textarea" placeholder="Message"  style = {{width:300, height:100}}/>
	    	</div>
	    	<br />
	    	<button disabled={isSubmitting}>Submit</button>
	    </Form>
	)

	const FormikApp = withFormik({
		mapPropsToValues({firstname, lastname, email, textarea }) {
			return{
				firstname: firstname || "",
				lastname: lastname || "",
				email: email || "",
				textarea: textarea || ""
			}
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email().required(),
			textarea: Yup.string().required("Please enter a message")
		}),
		handleSubmit(values, {resetForm, setSubmitting}) {
			console.log(values)
			resetForm()
			setSubmitting(false)
		}
	})(App)

	render(<FormikApp />, document.getElementById('root'));

