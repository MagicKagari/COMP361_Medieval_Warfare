import UnityEngine.UI;
import UnityEngine;
import System.Collections;

var ExitButton:UI.Button;
var OptionButton:UI.Button;
var CreditsButton:UI.Button;
var TitleText:UI.Text;
var LoginButton:UI.Button;
var TestField:UI.Text;
var UsernameInput:UI.InputField;
var PasswordInput:UI.InputField;

var CreditsWindowEnabled:boolean = false;

var LoginFlag = false;
var Username:String = "";
var Password:String = "";

function Start () {
	
}

function Update () {
	if(LoginFlag){
		LoginStart();
	}
}

function OnGUI(){
	
	if(CreditsWindowEnabled){
		ShowCredits();
	}

}

function ExitClicked(){
	Debug.Log("Exit clicked");
	TestField.text = "You clicked Exit.";
	Application.Quit();	
}

function CreditsClicked(){
	Debug.Log("Credits clicked");
	TestField.text = "You clicked Credits.";
	//display a credits window
	CreditsWindowEnabled = true;
	
}

function OptionClicked(){
	Debug.Log("Option clicked");
	TestField.text = "You clicked Option.";
	//load option level
}

function LoginClicked(){
	Debug.Log("Login clicked");
	//start tcp/ip link with server
	//var url = "http://cs.mcgill.ca/~rgao5/MW_login.php";
	/*
	var url = "http://cs.mcgill.ca/~rgao5/";
	var form = new WWWForm();
	
	//should get pw hashed somewhere
	//var hashedPW = PasswordInput.text.GetHashCode;
	//
	
	form.AddField("Username",UsernameInput.text);
	form.AddField("Password",PasswordInput.text);
	
	var login : WWW = new WWW(url);
	
	if(login.isDone){
		TestField.text = "You clicked Login. Username:"+UsernameInput.text+" Password:"+PasswordInput.text+login.text;
	}
	*/
	Username = UsernameInput.text;
	Password = PasswordInput.text;
	LoginFlag = true;
	
}

function ShowCredits(){
	var s:String = "COMP361 Medieval Warfare Team Socket\nContributor: Perry Tiu, William Raposo Pereira Mansur, Zhenyu Wang, Ran Gao";
	var style:GUIStyle = new GUIStyle();
	style.wordWrap = true;
	style.normal.background = Texture2D.blackTexture;
	style.normal.textColor = Color.red;
	GUI.Box(Rect((Screen.width)/4,(Screen.height)*3/4,300,300),s,style);
	
	if(GUI.Button(Rect((Screen.width)/4,(Screen.height)*3/4+70,50,50),"Close")){
		CreditsWindowEnabled = false;
	}
}

function LoginStart(){
	LoginFlag = false;
	var url = "http://cs.mcgill.ca/~rgao5/MW/MW_Login.php";
	var form = new WWWForm();	
	form.AddField("Username",Username);
	form.AddField("Password",Password);
	var login : WWW = new WWW(url,form);
	yield login;
	Debug.Log(login.text);
	if(login.error){
		TestField.text = "Login error";
	}else{
		TestField.text = login.text;
	}
}
