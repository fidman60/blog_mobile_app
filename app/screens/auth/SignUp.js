import React from "react";
import {ActivityIndicator, Picker, StyleSheet, View} from 'react-native';
import {Button, Icon, Input, Text} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-radio-form";
import {registerUser} from "../../services/BlogAPI";
import Alert from "../../components/Alert";
import {ScrollView} from "react-native-gesture-handler";

export default class SignUp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            c_password: "",
            country: null,
            birth_date: null,
            submitting: false,
            unknownError: false,
            registrationSucceed: false,
            errors: initialErrors,
        };

        this.gender = null;

        this._datePickerStyle = {
            dateIcon: styles.dateIcon,
            dateInput: styles.dateInput,
            dateText: styles.dateText,
            placeholderText: styles.placeholderText
        };
    }

    _onSelect( item ) {
        this.gender = item.value;
    };

    _onRegister = () => {
        const {fname, lname, email, password, c_password, country, birth_date} = this.state;
        this.setState({
            submitting: true,
            unknownError: false,
            registrationSucceed: false,
        });

        const data = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            c_password: c_password,
            country_id: country,
            birth_date: birth_date,
            gender: this.gender
        };

        return registerUser(data)
            .then( response => {
                this.gender = null;
                this.setState({
                    ...this.state,
                    ...intialeUserFields,
                    errors: initialErrors,
                    submitting: false,
                    registrationSucceed: true,
                },() => {this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})});
            })
            .catch(error => {
                const status = error.response.status;
                if (status === 401){
                    const errors = error.response.data.error;
                    const stateError = {};
                    if ("fname" in errors) stateError.fname = {error: true, message: errors.fname[0]};
                    if ("lname" in errors) stateError.lname = {error: true, message: errors.lname[0]};
                    if ("gender" in errors) stateError.gender = {error: true, message: errors.gender[0]};
                    if ("birth_date" in errors) stateError.birth_date = {error: true, message: errors.birth_date[0]};
                    if ("country_id" in errors) stateError.country = {error: true, message: errors.country_id[0]};
                    if ("email" in errors) stateError.email = {error: true, message: errors.email[0]};
                    if ("password" in errors) stateError.password = {error: true, message: errors.password[0]};
                    if ("c_password" in errors) stateError.c_password = {error: true, message: errors.c_password[0]};

                    this.setState({
                        errors: {
                            ...initialErrors,
                            ...stateError
                        },
                        submitting: false,
                    });

                    return;
                }

                this.setState({
                    submitting: false,
                });
            });
    };

    _onChangePicker = (value) => {
        this.setState({
            country: value,
        })
    };

    _onLnameChange = (value) => this.setState({lname: value});

    _onFnameChange = (value) => this.setState({fname: value});

    _onDatePickerChange = (date) => {this.setState({birth_date: date})};

    _onChangeEmail = (value) => this.setState({email: value});

    _onChangePassword = (value) => this.setState({password: value});

    _onChangeConfirmPassword = (value) => this.setState({c_password: value});

    _navigateToLogin = () => {this.props.navigation.navigate("SignIn")};

    _onRadioFormChange = (item) => this._onSelect(item);

    render() {
        const {fname, lname, birth_date, country, email, password, c_password, submitting, errors, unknownError, registrationSucceed} = this.state;
        return (
            <ScrollView ref="scrollView" style={styles.main_container}>
                <View style={styles.parent_view}>
                    <Text style={styles.title}>REGISTER</Text>
                    <View style={styles.form}>
                        <View style={styles.main}>
                            {unknownError && <Alert addPadding={true} text={"Sorry, something went wrong"} status="error"/>}
                            {registrationSucceed && <Alert addPadding={true} text={"Congratulation, your account has been created !"} status="success"/>}
                            <Input
                                placeholder={"First name"}
                                errorMessage={errors.fname.error ? errors.fname.message : null}
                                errorStyle={styles.error}
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.container}
                                inputStyle={styles.input}
                                value={fname}
                                onChangeText={this._onFnameChange}
                            />
                            <Input
                                placeholder={"Last name"}
                                errorMessage={errors.lname.error ? errors.lname.message : null}
                                errorStyle={styles.error}
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.container}
                                inputStyle={styles.input}
                                value={lname}
                                onChangeText={this._onLnameChange}
                            />
                            <View style={[{paddingLeft: 10, paddingRight: 10}, styles.container]}>
                                <View style={styles.datePickerView}>
                                    <DatePicker
                                        style={styles.datePickerStyle}
                                        date={birth_date} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="Birth date"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-1920"
                                        maxDate="31-12-2008"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        value={birth_date}
                                        customStyles={this._datePickerStyle}
                                        onDateChange={this._onDatePickerChange}
                                    />
                                </View>
                                {errors.birth_date.error && <View style={styles.errorContainer}><Text style={styles.error}>{errors.birth_date.message}</Text></View>}
                            </View>
                            <View style={styles.selectCountryView}>
                                <View style={styles.dropdownView}>
                                    <Picker
                                        selectedValue={country}
                                        style={styles.picker}
                                        mode="dropdown"
                                        onValueChange={this._onChangePicker}
                                    >
                                        <Picker.Item color="#918b8b" label="Select country" value="select" />
                                        <Picker.Item color="black" label="Morocco" value={1} />
                                        <Picker.Item color="black" label="Spain" value={2} />
                                        <Picker.Item color="black" label="French" value={3} />
                                        <Picker.Item color="black" label="USA" value={4} />
                                        <Picker.Item color="black" label="Algeria" value={5} />
                                        <Picker.Item color="black" label="Egypte" value={6} />
                                    </Picker>
                                </View>
                                {errors.country.error && <View style={styles.errorContainer}><Text style={styles.error}>{errors.country.message}</Text></View>}
                            </View>
                            <Input
                                placeholder={"Email"}
                                errorMessage={errors.email.error ? errors.email.message : null}
                                errorStyle={styles.error}
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.container}
                                inputStyle={styles.input}
                                value={email}
                                onChangeText={this._onChangeEmail}
                            />
                            <Input
                                secureTextEntry={true}
                                placeholder={"Password"}
                                errorMessage={errors.password.error ? errors.password.message : null}
                                errorStyle={styles.error}
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.container}
                                inputStyle={styles.input}
                                value={password}
                                onChangeText={this._onChangePassword}
                            />
                            <Input
                                secureTextEntry={true}
                                placeholder={"Confirm password"}
                                errorMessage={errors.c_password.error ? errors.c_password.message : null}
                                errorStyle={styles.error}
                                inputContainerStyle={styles.inputContainer}
                                containerStyle={styles.container}
                                inputStyle={styles.input}
                                value={c_password}
                                onChangeText={this._onChangeConfirmPassword}
                            />
                            <View>
                                <View style={styles.genderView} >
                                    <Icon name="venus-mars" type="font-awesome" color="#918b8b"/>
                                    <Text>: </Text>
                                    <RadioForm
                                        style={{ width: 320 }}
                                        dataSource={mockData}
                                        itemShowKey="label"
                                        itemRealKey="value"
                                        circleSize={16}
                                        initial={null}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        onPress={this._onRadioFormChange}
                                    />
                                </View>
                                {errors.gender.error && <View style={styles.errorContainer}><Text style={styles.error}>{errors.gender.message}</Text></View>}
                            </View>
                        </View>
                        <Button
                            title={"Login"}
                            disabled={submitting}
                            icon={submitting ? <ActivityIndicator color="white" style={styles.activityIndicator}/> : null}
                            disabledStyle={styles.disabledLoginBtn}
                            buttonStyle={styles.loginBtn}
                            containerStyle={styles.containerLoginBtn}
                            onPress={this._onRegister}
                        />
                        <View style={styles.bottomView}>
                            <Text style={styles.textRegistered}>Already registered? <Text onPress={this._navigateToLogin} accessibilityRole="link" style={styles.textSignIn}>Sign in now</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const intialeUserFields = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    c_password: "",
    country: "select",
    birth_date: null,
};

const initialErrors = {
    fname: {
        error: false,
        message: ""
    },
    lname: {
        error: false,
        message: ""
    },
    email: {
        error: false,
        message: ""
    },
    password: {
        error: false,
        message: ""
    },
    c_password: {
        error: false,
        message: ""
    },
    language: {
        error: false,
        message: ""
    },
    birth_date: {
        error: false,
        message: ""
    },
    country: {
        error: false,
        message: ""
    },
    gender: {
        error: false,
        message: ""
    }
};

const mockData = [
    {
        label: 'Women',
        value: 0
    },
    {
        label: 'Men',
        value: 1
    }
];

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    parent_view: {
        padding: 20
    },
    title: {
        marginTop: 20,
        fontFamily: "feather",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    },
    form: {
        marginTop: 40,
    },
    error: {
        color: "red",
        fontSize: 12,
        padding: 0,
    },
    errorContainer: {
        padding: 5
    },
    inputError: {
        borderWidth: 1,
        borderColor: "red",
    },
    container: {
        marginBottom: 15
    },
    inputContainer: {
        backgroundColor: "#f6dae7"
    },
    input: {
        color: "black",
        paddingLeft: 10
    },
    textCheckbox: {
        color: "#a2a2a2"
    },
    checkboxContainer: {
        padding: 0,
        borderWidth: 0
    },
    loginBtn: {
        padding: 15,
        backgroundColor: "#c34c89"
    },
    disabledLoginBtn: {
        backgroundColor: "#b47595",
        opacity: 1
    },
    containerLoginBtn: {
        padding: 10
    },
    dropdownView: {
        backgroundColor: "#f6dae7",
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    picker: {
        width: "100%",
        color: "#918b8b"
    },
    genderView: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    datePickerView: {
        backgroundColor: "#f6dae7",
        padding: 3,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    selectCountryView: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
    },
    main: {
        marginBottom: 20
    },
    dateIcon: {
        position: 'absolute',
        right: 6,
        top: 12,
        marginLeft: 0,
        width: 18,
        height: 18
    },
    dateInput: {
        paddingLeft: 10,
        alignItems: 'flex-start',
        borderWidth: 0,
    },
    dateText: {
        color: /*"#918b8b"*/"black",
        fontSize: 16,
    },
    placeholderText: {
        color: "#918b8b",
        fontSize: 16,
    },
    datePickerStyle: {
        width: "100%"
    },
    activityIndicator: {
        marginRight: 5
    },
    bottomView: {
        marginTop: 30,
        marginBottom: 30
    },
    textRegistered: {
        textAlign: "center"
    },
    textSignIn: {
        textDecorationLine: "underline"
    }
});