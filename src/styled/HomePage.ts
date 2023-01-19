import styled from "styled-components";


export const HomeContainer = styled.div`
 display: flex;
    align-items: center;
    justify-content: center;
    height: 91vh;
    border-top:1px solid lightgrey;
    .home-container{
        width:100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        .sidebar{
            flex:1;
            background-color: #F8F9FA;
            border-right: 1px solid lightgrey;
            position: relative;
            color:black;
            overflow: hidden;
            max-width:500px;
        }
        .chat{
            flex:2;
            .noChat{
                display: flex;
                align-items:center;
                justify-content: center;
                color: grey;
                background-color: #F8F9FA;
                height: 100%;
                font-size:40px;
            }
        }
    }
`

export const SearchContainer = styled.div`
border-bottom:1px solid lightgray;
.searchForm{
    padding:6px;
    input{
        background-color:#F8F8FA;
        color: black;
        outline: none;
        border: none;
        font-size: 19px;
        &::placeholder{
            color:grey;
        }
    }
}
`
export const ChatInfoContainer = styled.div`
    height: 50px;
    background-color:#F8F9FA;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color:black;
    font-weight:500;
    border-bottom:1px solid lightgray;
    .dropdown-toggle::after {
    display: none !important; 
    }
    .chatIcons{
        display: flex;
        gap:10px;
        padding: 10px;
        img{
            height: 35px;
            cursor: pointer;
        }
    }
    .chatHeaderImage{
    width:40px;
    height:40px;
    border-radius:50px;
    // object-fit: cover;
    border: 1px solid lightgrey;
    cursor:pointer;
    margin-right:10px;
}
    
`

export const MessagesContainer = styled.div`
    background-color:#fed7aa; //#dbeafe
    padding: 10px;
    height: calc(100% - 101px);
    overflow-y:scroll;
`
export const InputContainer = styled.div`
    background-color: #F8F9FA;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    border:2px solid lightgray;
    form{
        padding:0;
        margin: 0;
        display: flex;
        width: 100%;
        input{
        width: 100%;
        font-size:20px;
        border: none;
        outline: none;
        color:black;
        word-break: break-all;
        
    }
    .send{
        display: flex;
        align-items: center;
        gap:10px;
        img{
            width: 30px;
            cursor: pointer;
            padding:5px;
            &:hover{
                width: 36px;
                padding: 6px;
            }
        }
        button{
            border:none;
            padding:4px 5px;
            color:white;
            border-radius:5px;
            cursor:pointer;
            &:hover{
                    background-color:steelblue;
                    color:white;
                    transition: all ease-out 0.3s;
                }
        }
    }
    
    }
`

export const MessageContainer = styled.div`
    display: flex;
    gap:10px;
    .messageInfo{
        display: flex;
        flex-direction: column;
        color:gray;
        font-weight: 300;
        margin-bottom:20px;
        align-items: flex-start;
        span{
            @media(max-width:550px){
                font-size: 10px;
                font-weight: bolder;
            }
        }
        .profilePic{
            width: 40px;
            height: 40px;
            border-radius:50%;
            border:1px solid lightgrey;
        }
    }
    .messageContent{
        max-width: 80%;
        display: flex;
        flex-direction: column;
        gap:0px;
        
        span{
            background-color: white;
            padding:8px 15px;
            border-radius: 0px 10px 10px 10px;
            max-width: max-content;
            border:1px solid lightgrey;
            align-items:stretch;
            img{
               width: 18px;
               height:23px;
               cursor: pointer;
            }
        }
        img{
            width: 50%;
        }
        
    }
    &.owner{
        flex-direction: row-reverse;
        .dropdown-toggle::after {
                display: none !important; 
            }
        .messageInfo{
            align-items: flex-end;
        }
        .messageContent{
            align-items: flex-end;
            span{
                background-color: steelblue;
                border:1px solid lightgrey;
                color:white;
                border-radius: 10px 0px 10px 10px;
            }
            img{
               width: 18px;
               height:20px;
               cursor: pointer;
               margin-top:-26px;
               margin-right: -14px;
            }
            
        }
    }
`