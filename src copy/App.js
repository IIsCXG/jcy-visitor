import './App.less'
import React from 'react';
import { useRoutes } from "react-router";
// 导入路由表
import router from './router'
export default function App() {
  const element = useRoutes(router)

  return (
    <>
      {
        element
      }

    </>
  )
}

