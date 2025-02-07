## 03. Component: Property

#### Property
1. 컴포넌트의 데이터
2. 부모가 소유한 데이터 
3. 부모에서 자식으로 전달된다.
4. 자식에서 변경 불가
5. Data Flow
    - 컴포넌트 통신
    - Top -> Down
6. PropTypes: 프로퍼티 값의 유효성 검증 라이브러리


#### Examples
1. 함수 컴포넌트의 property - (예제: ex01)
2. Data Flow - (예제: ex02)
3. 클래스 컴포넌트의 property - (예제: ex03)
4. Property Validation - (예제: ex04)
   

#### 실습
1. Install Packages
   
   1) Dependencies

        $ npm i react react-dom prop-types

   2) Dev. Dependencies
   
        $ npm i -D webpack webpack-cli webpack-dev-server css-loader style-loader sass-loader sass babel-loader @babel/core @babel/preset-env @babel/preset-react

   3) 새롭게 추가된 의존성
        - Property Validation (예제: ex04)
        - prop-types 패키지 추가


2. NPM scripting : package.json

    "scripts": {
        "start": "npx webpack serve --config config/webpack.config.js --progress --mode development",
        "build": "npm i && npx webpack --config config/webpack.config.js --mode production"
    } 


3. Configuration

    1) config/babel.config.json
    2) config/webpack.config.js


4. Landing

    public/index.html


5. Test

    $ npm start


6. Build

    $ npm run build
