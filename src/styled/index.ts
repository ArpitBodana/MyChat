import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

body{
    user-select: none;
    background-color:#F8F9FA;
}
a{
    text-decoration: none;
}
.form-div{
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    height: 100vh; 
    background-color: #F8F8FA;
    
  }
.from-wrap{
    background-color: white;
    padding: 20px 60px;
    border-radius: 10px;
    display: flex;
    flex-direction:column;
    gap: 10px;
    align-items:center;
    justify-content: center;
    border:2px solid steelblue;
    @media (max-width:400px){
        padding: 20px 20px;
    }
    
    form{
        display: flex;
        flex-direction:column;
        gap: 15px;
        
        input{
            padding:10px;
            border:none;
            outline-color:steelblue;
            border-bottom: 1px solid steelblue;
            &::placeholder{
                color:rgb(175,175,175)
            }
        }
        textarea{
            padding:10px;
            border:none;
            outline-color:steelblue;
            border-bottom: 1px solid steelblue;
            &::placeholder{
                color:rgb(175,175,175)
            }
        }
        button{
            background-color: steelblue;
            padding:10px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            color:white;
            &:hover{
                opacity: 60%;
            }
        }
        p{
            color:steelblue;
            align-self: center;
        }
        label{
            display: flex;
            align-items: center;
            gap:10px;
            color:steelblue;
            font-size:12px;
            cursor: pointer;
            img{
                width:5rem;
            }
        }
    }
    .logo{
        color: steelblue;
        font-size:30px;
        font-weight:400;
    }
    .title{
        color:steelblue;
        font-size: 20px;
    }
    .error{
        color:red;
        align-self:center;
        max-width: 200px;
    }

}
.userChat{
    display: flex;
    align-items: center;
    gap: 10px;
    color:black;
    cursor: pointer;
    padding: 3px;
    padding-left: 10px;
    &:hover{
        background-color:rgba(0,0,0,0.25);
        transition: all ease-out 0.3s;
    }
    img{
        width:40px;
        height:40px;
        border-radius:50px;
        /* object-fit: cover; */
        border: 1px solid lightgrey;
    }
    .userChatInfo{
        display: flex;
        gap:5px;
        span{
            font-size: 16px;
            font-weight: 500;
        }
        p{
            font-size: 13px;
            color:gray;
            display: flex;
        }
    }
}
.icons{
    width:40px;
    height:40px;
    object-fit: cover;
}
.options{
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.25);
        transition: all ease-out 0.3s;
    }
}
.scrollMe{
    overflow-y: scroll;
    height:calc(100% - 50px); ;
}
.profile-bottom{
    min-height:50vmin;
}
.myInput{
    padding:10px;
    border:none;
    outline-color:steelblue;
    border-bottom: 1px solid steelblue;
    &::placeholder{
        color:rgb(175,175,175)
    }
}
.changePassword{
   padding: 40px; 
}
.online-mark{
    width:20px;
    margin-left:-24px;
    margin-right :10px;
    margin-top:19px;

}
.online-mark-convo{
    width:16px;
    margin-left:-19px;
    margin-right :12px;
    margin-top:15px;
    border: none;
    img{
        border: none;
    }
}

`