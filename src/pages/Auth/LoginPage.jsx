import {Link, useNavigate} from 'react-router-dom'


import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';


import request from '../services/http/index'



import {Formik, Form, Field} from 'formik'
import {object, string} from 'yup';

import './Auth.scss'


const LoginPage = ({setToken}) => {
    let navigate = useNavigate();

    const handleSub = () => {
        request.post(`https://api.themoviedb.org/3/authentication/session/new`, {
            params: {
                api_key: "7b569a40a0e5bb279cbb8360767434cc"
            },
            
        
            
        },
        
        {
            request_token: window.localStorage.getItem("sessionToken")
        }
        )
        .then((response) => {
            console.log(response)
            
            window.localStorage.setItem("sessionToken", response.data.success)
            setToken(response.data.success)
            navigate("/movies")
        })
        .catch((err) => {
         
            console.log(err)
        })
    }
   

    return(
        <Container maxWidth="lg">
           <Formik
           initialValues={{
               name: "",
               email: "",
               password: ""
           }}

           onSubmit={(values, formikHelpers) => {
                formikHelpers.resetForm()
                handleSub()
           }}
           validationSchema={object({
               name: string().required("Please enter name").min(5, "Name too short"),
               email: string().required("Please enter email").email("Invalid email"),
               password: string()
               .required("Please enter password")
               .min(7, "Password should be minimum 7 characters")
           })}

           
           >


           
               
               
               {({errors, isValid, touched, dirty}) => (

                  
                
                       
                  <div className="login">
                      <div className="login-inner">
{console.log(errors , "-------------", touched)}
{console.log(isValid , "-------------", dirty)}
                        <div className="log-titles">
                           <h1 className='title-log'>
                           Login
                           </h1>
                        </div>

                      <Form>
                            <div className="login-name-wrap">
                            <Field 
                            as={TextField}
                           type="name"
                            variant="outlined"
                            label="Your name" 
                            className='log-name'
                            name="name"
                            error={errors.name && touched.name}
                            helperText={touched.name && errors.name}
                            />
                            </div>
                           

                            <div className="login-email-wrap">
                            <Field 
                            as={TextField}
                            type="email"
                         
                            variant="outlined"
                            label="Your email" 
                            className='log-name'
                            name="email"
                            error={errors.email && touched.email}
                            helperText={touched.email && errors.email}
                            />
                            </div>
                           

                        
                               
                                
                                    <div className="login-password-wrap">
                                    <Field
                                   
                                
                                   
                                   as={TextField}
                                   variant="outlined"
                                   label="Your password" 
                                   type="password"
                                   name="password"
                                   error={errors.password && touched.password}
                                   helperText={touched.password && errors.password}
                                   className='log-password'
                                   
                               
                                       
                                   />
                                    </div>


                                    <Link to="/register" className='link-toRegister'>
                                        You haven't still sign up. Go to register
                                    </Link>


                                    
                   



                       


                      
                           <div className="log-btns">
                           <div className="log-submit">
                           <Button 
                            variant="contained" 
                            color="primary" 
                            type='submit' 
                            disabled={!dirty && !isValid}
                            
                            >
                                Submit
                            </Button>
                           </div>

                            <div className='log-reset'>
                            <Button 
                            variant="contained" 
                            color="secondary" 
                            type='reset'
                            
                            >
                                Reset
                            </Button>
                            </div>
                           </div>
                        
                  </Form>

                      </div>
                  </div>
                   
               
               )}
                 
           </Formik>
        </Container>
    )
}


export default LoginPage