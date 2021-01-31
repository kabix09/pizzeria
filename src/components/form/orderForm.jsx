import { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup  from 'yup';
import * as UI from 'semantic-ui-react';

class OrderForm extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            initialValues: {
                name: "",
                surename: "",
                email: "",
                phoneNumber: "",
                town: "",
                address: ""
            }
        }
    }

    orderValidationShema = () => Yup.object().shape({
        name: Yup.string()
          .min(3, "Name is too short!")
          .max(15, "Name is too long!")
          .required("Name is required"),
      
        surename: Yup.string()
          .min(5, "Surename is too short!")
          .max(30, "Surename is too long!")
          .required("Surename is required"),
      
        email: Yup.string()
            .email()
            .required("Email is required"),

        phoneNumber: Yup.string()
          .required("Phone number is required")
          .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/, "Invalid phone number"),
      
        town: Yup.string()
          .required("Town is required"),
        
        address: Yup.string()
            .required("Address is required")
      });

      
    submitForm = (formValues) => {
        console.log(formValues);
    };

    render()
    { 
        return (
            
            <Formik
                initialValues = {this.state.initialValues}
                validationSchema={this.orderValidationShema}
                onSubmit = {async (fields) => {this.submitForm(fields);}}
            >
                
                {({ isSubmitting }) => (
                    
                    <Form className="ui form">
                        <UI.Form.Group widths='equal'>
                            <UI.Form.Field>
                                <label htmlFor="name">First name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                />
                                    <ErrorMessage name="name" component="div" style={{text: "red"}} />
                            </UI.Form.Field>                 

                            <UI.Form.Field>
                                <label htmlFor="surename">Surename</label>
                                <Field
                                    type="text"
                                    name="surename"
                                    placeholder="Enter surename"
                                />
                                <ErrorMessage name="surename" component="div" className="invalid-feedback" />
                            </UI.Form.Field>
                        </UI.Form.Group>

                        <UI.Form.Group widths='equal'>
                            <UI.Form.Field >
                                <label htmlFor="email">Email</label>
                                <Field 
                                    name="email" 
                                    type="text" 
                                    placeholder="example@email.com"
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </UI.Form.Field>

                            <UI.Form.Field>
                                <label htmlFor="phoneNumber">Phone number</label>
                                <Field 
                                    name="phoneNumber" 
                                    type="tel" 
                                    placeholder="000 000 000"
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                            </UI.Form.Field>
                        </UI.Form.Group>

                        <UI.Form.Group widths='equal' >
                            <UI.Form.Field width={4}>
                                <label htmlFor="town">Town</label>
                                <Field 
                                    name="town" 
                                    type="text" 
                                    placeholder="Poznan"
                                />
                                <ErrorMessage name="town" component="div" className="invalid-feedback" />
                            </UI.Form.Field>

                            <UI.Form.Field width={10}>
                                <label htmlFor="address">Address</label>
                                <Field 
                                    name="address" 
                                    type="text" 
                                    placeholder="Enter street or estate"
                                />
                                <ErrorMessage name="address" component="div" className="invalid-feedback" />
                            </UI.Form.Field>
                        </UI.Form.Group>

                        <UI.Form.Button floated='right'
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={ this.props.isBasketEmpty || isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Submit"}
                        </UI.Form.Button>
                    </Form>
                    
                    
                )}
                </Formik>
            
        );
    }
}
export default OrderForm;