import{j as t,r as m,C as f,F as r,s as w,v as N}from"./vendor-react-D439mYZB.js";import{R as A,e as k,s as P,u as B,a as M,I as j,b as R}from"./index-CCO37Pg2.js";import"./vendor-misc-BkUckcGj.js";import"./vendor-utils-DifT8CeW.js";import{i as T}from"./format-string-Cee-rHUc.js";import{q as h}from"./vendor-ui-qtF25uBn.js";import"./vendor-redux-CY9rYXZh.js";const G=({color:e="#1890ff"})=>t.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{marginRight:"8px",marginTop:"5px"},children:[t.jsx("path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:e,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M12 16V12",stroke:e,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M12 8H12.01",stroke:e,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),V=e=>{const{iconColor:s="#1890ff",backgroundColor:a="#e6f4ff",textColor:i="#000",message:l="",borderLeftColor:p="#fff"}=e||{};return t.jsxs("div",{style:{background:a,borderLeft:`4px solid ${p}`,display:"flex",alignItems:"flex-start",borderRadius:"4px",fontSize:"14px",color:i,textAlign:"left"},children:[t.jsx(G,{color:s}),l]})},q=A.injectEndpoints({endpoints:e=>({signIn:e.mutation({query:s=>({url:k.auth.signIn,method:"POST",body:s}),async onQueryStarted(s,{dispatch:a,queryFulfilled:i}){const{data:l}=await i;if(l){const{access_token:p=""}=l;a(P({accessToken:p}))}}}),getAuthorizeMe:e.query({query:({id:s})=>({url:`${k.auth.authorizeMe}/${s}`,method:"GET"})})})}),{useSignInMutation:z}=q,F=h.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    position: relative;
    min-height: 100vh;
    padding: 16px;
`,O=h.img`
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
`,U=h.img`
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
`;const H="/assets/images/logo.png",Q="/assets/images/bg3.png",tt=()=>{const[e,s]=m.useState(""),[a,i]=m.useState(""),[l,p]=m.useState(""),[g,b]=m.useState(""),[u,y]=m.useState(!1),{checkUserSession:v}=B(),C=M(),[S]=z(),E=async o=>{const c={email:o?.email||"",password:o?.password||""};try{const d=await S(c).unwrap(),{is_success:n,user:x}=d||{};if(n){const{access_token:L=""}=d||{};await R(L,JSON.stringify(x)),x.role==="admin"&&(s(""),i(""),await v?.(),C.refresh())}}catch{const n="Sai username hoặc password. Vui lòng kiểm tra và thử lại.";N.error(n),s(n),i(n)}},I=o=>{o.preventDefault();let c=!1;const d=l?.trim()||"",n=g?.trim()||"";d?T(d)||(s("Email không hợp lệ."),c=!0):(s("Vui lòng nhập email."),c=!0),n||(i("Vui lòng nhập mật khẩu."),c=!0),!c&&E({email:d,password:n})};return t.jsxs(F,{children:[t.jsx(O,{src:Q,alt:"background"}),t.jsxs(W,{children:[t.jsxs(_,{children:[t.jsx(U,{src:H,alt:"logo"}),t.jsx("h3",{style:{marginTop:10},children:"Đăng nhập Portal"})]}),t.jsx(f,{children:t.jsxs(f.Body,{children:[t.jsxs(r,{onSubmit:I,children:[t.jsxs(r.Group,{controlId:"loginEmail",children:[t.jsx(r.Label,{children:"Email"}),t.jsx(r.Control,{type:"email",placeholder:"Nhập email",value:l,onChange:o=>{p(o.target.value),e&&s("")},isInvalid:!!e}),t.jsx(r.Control.Feedback,{type:"invalid",children:e})]}),t.jsxs(r.Group,{controlId:"loginPassword",className:"mt-3",children:[t.jsx(r.Label,{children:"Mật khẩu"}),t.jsxs("div",{className:"position-relative",children:[t.jsx(r.Control,{type:u?"text":"password",placeholder:"Nhập mật khẩu",value:g,onChange:o=>{b(o.target.value),a&&i("")},isInvalid:!!a,style:{paddingRight:"2.25rem"}}),t.jsx(w,{variant:"link",className:"position-absolute border-0 bg-transparent p-0",style:{right:"0.5rem",top:"50%",transform:"translateY(-50%)"},onClick:()=>y(o=>!o),"aria-label":u?"Ẩn mật khẩu":"Hiện mật khẩu",children:t.jsx("img",{src:u?j.icNoEye:j.icEye,alt:u?"Hide":"Show",width:20,height:20})})]}),t.jsx(r.Control.Feedback,{type:"invalid",children:a})]}),t.jsx(w,{variant:"primary",type:"submit",className:"mt-4 w-100",children:"Đăng nhập"})]}),t.jsx("div",{className:"mt-3",children:t.jsx(V,{iconColor:"#727272",textColor:"#727272",backgroundColor:"#fff",message:"Nếu bạn chưa có tài khoản, hãy liên hệ Quản lý của phần mềm để được hỗ trợ đăng ký tài khoản."})})]})})]})]})};export{tt as JwtSignInView};
