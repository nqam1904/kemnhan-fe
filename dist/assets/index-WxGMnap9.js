import{j as t,R as A,e as j,s as N,q as h,u as R,a as B,C as w,B as k,I as y,b as M,c as P}from"./index-CGSQnQu3.js";import{r as m}from"./vendor-D10guwLI.js";import{i as z}from"./format-string-Cee-rHUc.js";import{F as r}from"./Form-DYuaszbI.js";import"./ElementChildren-DQADstU7.js";const G=({color:s="#1890ff"})=>t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{marginRight:"8px",marginTop:"5px"},children:[t.jsx("path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M12 16V12",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M12 8H12.01",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),T=s=>{const{iconColor:o="#1890ff",backgroundColor:d="#e6f4ff",textColor:i="#000",message:n="",borderLeftColor:p="#fff"}=s||{};return t.jsxs("div",{style:{background:d,borderLeft:`4px solid ${p}`,display:"flex",alignItems:"flex-start",borderRadius:"4px",fontSize:"14px",color:i,textAlign:"left"},children:[t.jsx(G,{color:o}),n]})},O=A.injectEndpoints({endpoints:s=>({signIn:s.mutation({query:o=>({url:j.auth.signIn,method:"POST",body:o}),async onQueryStarted(o,{dispatch:d,queryFulfilled:i}){const{data:n}=await i;if(n){const{access_token:p=""}=n;d(N({accessToken:p}))}}}),getAuthorizeMe:s.query({query:({id:o})=>({url:`${j.auth.authorizeMe}/${o}`,method:"GET"})})})}),{useSignInMutation:V,useLazyGetAuthorizeMeQuery:Z}=O,q=h.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    position: relative;
    min-height: 100vh;
    padding: 16px;
`,F=h.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: 0;
`,W=h.div`
    max-width: 485px;
    width: 100%;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-left: 74px;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 24px;
    }
`,_=h.div`
    margin-bottom: 24px;
`,Q=h.img`
    width: 60px;
`;h.div`
    position: absolute;
    bottom: 0;
    background: #f9f9f9;
    width: 100%;
    text-align: center;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #727272;

    @media (max-width: 768px) {
        display: none;
    }
`;const H="/assets/images/logo.png",$="/assets/images/bg3.png",X=()=>{const[s,o]=m.useState(""),[d,i]=m.useState(""),[n,p]=m.useState(""),[g,b]=m.useState(""),[u,C]=m.useState(!1),{checkUserSession:x}=R(),v=B(),[E]=V(),L=async e=>{const c={email:(e==null?void 0:e.email)||"",password:(e==null?void 0:e.password)||""};try{const a=await E(c).unwrap(),{is_success:l,user:f}=a||{};if(l){const{access_token:I=""}=a||{};await M(I,JSON.stringify(f)),f.role==="admin"&&(o(""),i(""),await(x==null?void 0:x()),v.refresh())}}catch(a){const l="Sai username hoặc password. Vui lòng kiểm tra và thử lại.";P.error(l),o(l),i(l),console.log("ERROR",a)}},S=e=>{e.preventDefault();let c=!1;const a=(n==null?void 0:n.trim())||"",l=(g==null?void 0:g.trim())||"";a?z(a)||(o("Email không hợp lệ."),c=!0):(o("Vui lòng nhập email."),c=!0),l||(i("Vui lòng nhập mật khẩu."),c=!0),!c&&L({email:a,password:l})};return t.jsxs(q,{children:[t.jsx(F,{src:$,alt:"background"}),t.jsxs(W,{children:[t.jsxs(_,{children:[t.jsx(Q,{src:H,alt:"logo"}),t.jsx("h3",{style:{marginTop:10},children:"Đăng nhập Portal"})]}),t.jsx(w,{children:t.jsxs(w.Body,{children:[t.jsxs(r,{onSubmit:S,children:[t.jsxs(r.Group,{controlId:"loginEmail",children:[t.jsx(r.Label,{children:"Email"}),t.jsx(r.Control,{type:"email",placeholder:"Nhập email",value:n,onChange:e=>{p(e.target.value),s&&o("")},isInvalid:!!s}),t.jsx(r.Control.Feedback,{type:"invalid",children:s})]}),t.jsxs(r.Group,{controlId:"loginPassword",className:"mt-3",children:[t.jsx(r.Label,{children:"Mật khẩu"}),t.jsxs("div",{className:"position-relative",children:[t.jsx(r.Control,{type:u?"text":"password",placeholder:"Nhập mật khẩu",value:g,onChange:e=>{b(e.target.value),d&&i("")},isInvalid:!!d,style:{paddingRight:"2.25rem"}}),t.jsx(k,{variant:"link",className:"position-absolute border-0 bg-transparent p-0",style:{right:"0.5rem",top:"50%",transform:"translateY(-50%)"},onClick:()=>C(e=>!e),"aria-label":u?"Ẩn mật khẩu":"Hiện mật khẩu",children:t.jsx("img",{src:u?y.icNoEye:y.icEye,alt:u?"Hide":"Show",width:20,height:20})})]}),t.jsx(r.Control.Feedback,{type:"invalid",children:d})]}),t.jsx(k,{variant:"primary",type:"submit",className:"mt-4 w-100",children:"Đăng nhập"})]}),t.jsx("div",{className:"mt-3",children:t.jsx(T,{iconColor:"#727272",textColor:"#727272",backgroundColor:"#fff",message:"Nếu bạn chưa có tài khoản, hãy liên hệ Quản lý của phần mềm để được hỗ trợ đăng ký tài khoản."})})]})})]})]})};export{X as JwtSignInView};
