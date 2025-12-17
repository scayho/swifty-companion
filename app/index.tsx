import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, TextInput } from "react-native";
import { useUserStore } from "../(store)/userStore";
import { User } from "../interfaces/interface";

async function  getintratoken(seterromessage:any)  {
  try {
    const tokenRes = await fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${process.env.EXPO_PUBLIC_id}&client_secret=${process.env.EXPO_PUBLIC_secret}`,
    });
    const tokenData = await tokenRes.json();
    const access_token = tokenData.access_token;
    return (access_token);
  } catch (error) {
    console.log("exception throwen");
    seterromessage("failed to connect to intra");
    return ("");
  }
}

async function getuserinfo( token:string, login:string, setUser: any, seterromessage:any ) {
try {  
    console.log("hadi hya token :", token, " hada hwa login : ", login);
    const loginlowercase = login.toLowerCase();
    const userRes = await fetch(`https://api.intra.42.fr/v2/users/${encodeURIComponent(loginlowercase)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (userRes.status === 404) {
      console.log('User not found');
      seterromessage('User not found');
    } else if (!userRes.ok) {
      console.log('Failed to fetch user.');
      seterromessage('Failed to fetch user');
    } else {
      seterromessage('');
      const userData : User = await userRes.json();
      setUser(userData);
      router.push({pathname:"/Profile"});
    }
  } catch (error) {
    console.log("exception throwen");
    seterromessage("failed to connect to intra");
  }
}

export default function Search() {
    const [Login, onChangeLogin] = useState("");
    const [isEditable, setIsEditable] = useState(true);
    const [IntraToken, setIntraToken] = useState("");
    const [errormessage, seterromessage] = useState("");
    const setUser = useUserStore((state:any) => state.setUser);
    useEffect(  () => {
        const arrowfunction = async () => {
            const accesstoken = await getintratoken(seterromessage);
            setIntraToken(accesstoken);
        }
        arrowfunction();
      }, []);

    const startsearch = async () => {
        setIsEditable(false);
        if (Login.length && IntraToken?.length)
            await getuserinfo(IntraToken, Login, setUser, seterromessage);
        setIsEditable(true);
    }

  return (
    <ImageBackground
      source={require("./../assets/images/1337wallpaper.jpg")}
      style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
    >
     {errormessage ?  <Text style={{color: "red"}}>{errormessage}</Text> : null}
      <TextInput style={{borderWidth: 2, borderColor: "white", height: 42, width: 200, padding: 4, color: "white", marginBottom: 10}}
            value={Login}
            editable={isEditable}
            onChangeText={onChangeLogin}
            placeholder=" Intra Login ..."
            placeholderTextColor="white"
      />
        <Pressable  style={{borderWidth: 2, borderColor: "white", width: 120}}  onPress={startsearch}>
            <Text style={{borderWidth: 2 , color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center"}}> Search </Text>
        </Pressable>
    </ImageBackground>
  )
}
