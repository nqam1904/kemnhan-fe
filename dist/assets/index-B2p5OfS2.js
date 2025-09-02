import{j as t,R as A,e as w,s as N,q as c,r as p,u as R,a as B,C as j,B as k,I as y,b as M,c as P}from"./index-CvJx62Zl.js";import{i as z}from"./format-string-Cee-rHUc.js";import{F as i}from"./Form-B0TxpSMS.js";import"./ElementChildren-Ce4dmsvR.js";const G=({color:s="#1890ff"})=>t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{marginRight:"8px",marginTop:"5px"},children:[t.jsx("path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M12 16V12",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M12 8H12.01",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),T=s=>{const{iconColor:o="#1890ff",backgroundColor:l="#e6f4ff",textColor:r="#000",message:n="",borderLeftColor:h="#fff"}=s||{};return t.jsxs("div",{style:{background:l,borderLeft:`4px solid ${h}`,display:"flex",alignItems:"flex-start",borderRadius:"4px",fontSize:"14px",color:r,textAlign:"left"},children:[t.jsx(G,{color:o}),n]})},V=A.injectEndpoints({endpoints:s=>({signIn:s.mutation({query:o=>({url:w.auth.signIn,method:"POST",body:o}),async onQueryStarted(o,{dispatch:l,queryFulfilled:r}){const{data:n}=await r;if(n){const{access_token:h=""}=n;l(N({accessToken:h}))}}}),getAuthorizeMe:s.query({query:({id:o})=>({url:`${w.auth.authorizeMe}/${o}`,method:"GET"})})})}),{useSignInMutation:O,useLazyGetAuthorizeMeQuery:Y}=V,q=c.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    position: relative;
    min-height: 100vh;
    padding: 16px;
`,F=c.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: 0;
`,W=c.div`
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
`,_=c.div`
    margin-bottom: 24px;
`,Q=c.img`
    width: 60px;
`;c.div`
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
`;const H="/assets/images/logo.png",$="/assets/images/bg3.png",Z=()=>{const[s,o]=p.useState(""),[l,r]=p.useState(""),[n,h]=p.useState(""),[m,b]=p.useState(""),[u,C]=p.useState(!1),{checkUserSession:x}=R(),v=B(),[E]=O(),S=async e=>{const d={email:(e==null?void 0:e.email)||"",password:(e==null?void 0:e.password)||""};try{const a=await E(d).unwrap(),{is_success:g,user:f}=a||{};if(g){const{access_token:I=""}=a||{};await M(I,JSON.stringify(f)),f.role==="admin"&&(o(""),r(""),await(x==null?void 0:x()),v.refresh())}}catch(a){P.error("Sai username hoặc password. Vui lòng kiểm tra và thử lại."),o("Sai username hoặc password. Vui lòng kiểm tra và thử lại."),r(""),console.log("ERROR",a)}},L=e=>{e.preventDefault();let d=!1;const a=(n==null?void 0:n.trim())||"",g=(m==null?void 0:m.trim())||"";a?z(a)||(o("Email không hợp lệ."),d=!0):(o("Vui lòng nhập email."),d=!0),g||(r("Vui lòng nhập mật khẩu."),d=!0),!d&&S({email:a,password:g})};return t.jsxs(q,{children:[t.jsx(F,{src:$,alt:"background"}),t.jsxs(W,{children:[t.jsxs(_,{children:[t.jsx(Q,{src:H,alt:"logo"}),t.jsx("h3",{style:{marginTop:10},children:"Đăng nhập Portal"})]}),t.jsx(j,{children:t.jsxs(j.Body,{children:[t.jsxs(i,{onSubmit:L,children:[t.jsxs(i.Group,{controlId:"loginEmail",children:[t.jsx(i.Label,{children:"Email"}),t.jsx(i.Control,{type:"email",placeholder:"Nhập email",value:n,onChange:e=>{h(e.target.value),s&&o("")},isInvalid:!!s}),t.jsx(i.Control.Feedback,{type:"invalid",children:s})]}),t.jsxs(i.Group,{controlId:"loginPassword",className:"mt-3",children:[t.jsx(i.Label,{children:"Mật khẩu"}),t.jsxs("div",{className:"position-relative",children:[t.jsx(i.Control,{type:u?"text":"password",placeholder:"Nhập mật khẩu",value:m,onChange:e=>{b(e.target.value),l&&r("")},isInvalid:!!l,style:{paddingRight:"2.25rem"}}),t.jsx(k,{variant:"link",className:"position-absolute border-0 bg-transparent p-0",style:{right:"0.5rem",top:"50%",transform:"translateY(-50%)"},onClick:()=>C(e=>!e),"aria-label":u?"Ẩn mật khẩu":"Hiện mật khẩu",children:t.jsx("img",{src:u?y.icNoEye:y.icEye,alt:u?"Hide":"Show",width:20,height:20})})]}),t.jsx(i.Control.Feedback,{type:"invalid",children:l})]}),t.jsx(k,{variant:"primary",type:"submit",className:"mt-4 w-100",children:"Đăng nhập"})]}),t.jsx("div",{className:"mt-3",children:t.jsx(T,{iconColor:"#727272",textColor:"#727272",backgroundColor:"#fff",message:"Nếu bạn chưa có tài khoản, hãy liên hệ Quản lý của phần mềm để được hỗ trợ đăng ký tài khoản."})})]})})]})]})};export{Z as JwtSignInView};
