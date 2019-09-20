import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const PeopleForm = ({ errors, touched, values, status }) => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    if (status) {
      setPeople([status]);
    }
  }, [status]);

  return (
    <div className="memberForm">
      <h1>Welcome</h1>
      <Form>
        <Field type="text" name="person" placeholder="Your Name" />
        {errors.person && <p>{errors.person}</p>}

        <Field type="text" name="email" placeholder="Your email" />
        {errors.email && <p>{errors.email}</p>}

        <Field type="text" name="password" placeholder="Enter a password" />
        {errors.password && <p>{errors.password}</p>}

        <label className="checkbox-container">
          Read 'Terms of Service'
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {people.map(member => (
        <ul key={member.id}>
          <li>Name: {member.person}</li>
          <li>Email: {member.email}</li>
          <li>Password: {"*".repeat(member.password.length)}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ person, email, tos, password }) {
    return {
      tos: tos || false,
      email: email || "",
      person: person || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    person: Yup.string().required("Please enter your name!"),
    email: Yup.string().email().required("Valid email is required"),
    password: Yup.string().min(4).required("Your email must be at least four characters."),
tos: Yup.boolean().oneOf(
    [true]).required()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(PeopleForm); 

export default FormikForm;