[33mcommit aefc37fe0371da7c877da73e2c5538a3808411f3[m[33m ([m[1;32mfeat/GP-103[m[33m)[m
Author: Armsss9988 <leanhminh098@gmail.com>
Date:   Sun Apr 6 17:53:20 2025 +0700

    feat [GP-103] Refactor session management

[1mdiff --git a/src/features/session/ui/Details.jsx b/src/features/session/ui/Details.jsx[m
[1mindex 00c20ac..5297e4d 100644[m
[1m--- a/src/features/session/ui/Details.jsx[m
[1m+++ b/src/features/session/ui/Details.jsx[m
[36m@@ -1,7 +1,7 @@[m
 import React, { useEffect, useState } from "react";[m
 import axios from "axios";[m
 import { Card, Spin, Tag, Typography, Descriptions, Divider } from "antd";[m
[31m-import { TableType } from "@features/session/constraint/TableEnum";[m
[32m+[m[32mimport { TableType } from "@features/session/constant/TableEnum";[m
 [m
 const { Title, Text } = Typography;[m
 const statusTag = (status) => {[m
[36m@@ -11,7 +11,7 @@[m [mconst statusTag = (status) => {[m
     NOT_STARTED: { color: "gray", text: "Not Started" },[m
   };[m
   return ([m
[31m-    <Tag color={statusMap[status]?.color} className="rounded-3xl">[m
[32m+[m[32m    <Tag color={statusMap[status]?.color} className="rounded-3xl border-none">[m
       {statusMap[status]?.text || "Unknown"}[m
     </Tag>[m
   );[m

[33mcommit 6d229662383e5d4369747bf5ca677ab68fc22572[m
Author: Armsss9988 <leanhminh098@gmail.com>
Date:   Sun Apr 6 00:31:26 2025 +0700

    feat [GP-103] Fixing Session list

[1mdiff --git a/src/features/session/ui/Details.jsx b/src/features/session/ui/Details.jsx[m
[1mnew file mode 100644[m
[1mindex 0000000..00c20ac[m
[1m--- /dev/null[m
[1m+++ b/src/features/session/ui/Details.jsx[m
[36m@@ -0,0 +1,150 @@[m
[32m+[m[32mimport React, { useEffect, useState } from "react";[m
[32m+[m[32mimport axios from "axios";[m
[32m+[m[32mimport { Card, Spin, Tag, Typography, Descriptions, Divider } from "antd";[m
[32m+[m[32mimport { TableType } from "@features/session/constraint/TableEnum";[m
[32m+[m
[32m+[m[32mconst { Title, Text } = Typography;[m
[32m+[m[32mconst statusTag = (status) => {[m
[32m+[m[32m  const statusMap = {[m
[32m+[m[32m    COMPLETED: { color: "green", text: "Completed" },[m
[32m+[m[32m    ON_GOING: { color: "blue", text: "On Going" },[m
[32m+[m[32m    NOT_STARTED: { color: "gray", text: "Not Started" },[m
[32m+[m[32m  };[m
[32m+[m[32m  return ([m
[32m+[m[32m    <Tag color={statusMap[status]?.color} className="rounded-3xl">[m
[32m+[m[32m      {statusMap[status]?.text || "Unknown"}[m
[32m+[m[32m    </Tag>[m
[32m+[m[32m  );[m
[32m+[m[32m};[m
[32m+[m[32mconst Details = ({ type, id }) => {[m
[32m+[m[32m  const [data, setData] = useState(null);[m
[32m+[m[32m  const [loading, setLoading] = useState(true);[m
[32m+[m
[32m+[m[32m  useEffect(() => {[m
[32m+[m[32m    const fetchData = async () => {[m
[32m+[m[32m      try {[m
[32m+[m[32m        let url = "";[m
[32m+[m[32m        if (type === TableType.SESSION) {[m
[32m+[m[32m          url = `https://dev-api-greenprep.onrender.com/api/sessions/${id}`;[m
[32m+[m[32m        } else if (type === "student") {[m
[32m+[m[32m          url = `https://dev-api-greenprep.onrender.com/api/users/${id}`;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        const response = await axios.get(url);[m
[32m+[m[32m        setData(response.data.data || response.data);[m
[32m+[m[32m      } catch (error) {[m
[32m+[m[32m        console.error("Error when getting data:", error);[m
[32m+[m[32m      } finally {[m
[32m+[m[32m        setLoading(false);[m
[32m+[m[32m      }[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    fetchData();[m
[32m+[m[32m  }, [type, id]);[m
[32m+[m
[32m+[m[32m  if (loading) {[m
[32m+[m[32m    return <Spin className="flex justify-center mt-4" />;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  if (!data) {[m
[32m+[m[32m    return ([m
[32m+[m[32m      <Text type="danger" className="text-center block">[m
[32m+[m[32m        No data available.[m
[32m+[m[32m      </Text>[m
[32m+[m[32m    );[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  const formatDateTime = (dateTime) => {[m
[32m+[m[32m    const date = new Date(dateTime);[m
[32m+[m[32m    return date.toLocaleString("en-GB", {[m
[32m+[m[32m      year: "numeric",[m
[32m+[m[32m      month: "2-digit",[m
[32m+[m[32m      day: "2-digit",[m
[32m+[m[32m      hour: "2-digit",[m
[32m+[m[32m      minute: "2-digit",[m
[32m+[m[32m    });[m
[32m+[m[32m  };[m
[32m+[m[32m  const items =[m
[32m+[m[32m    type === "session"[m
[32m+[m[32m      ? [[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "1",[m
[32m+[m[32m            label: "Session Name",[m
[32m+[m[32m            children: data.sessionName || "Not Available",[m
[32m+[m[32m          },[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "2",[m
[32m+[m[32m            label: "Session Key",[m
[32m+[m[32m            children: data.sessionKey || "Not Available",[m
[32m+[m[32m          },[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "3",[m
[32m+[m[32m            label: "Participants",[m
[32m+[m[32m            children: data.SessionParticipants?.length || "Not Available",[m
[32m+[m[32m          },[m
[32m+[m[32m          { key: "4", label: "Status", children: statusTag(data.status) },[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "5",[m
[32m+[m[32m            label: "Start Time",[m
[32m+[m[32m            children: formatDateTime(data.startTime),[m
[32m+[m[32m          },[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "6",[m
[32m+[m[32m            label: "End Time",[m
[32m+[m[32m            children: formatDateTime(data.endTime),[m
[32m+[m[32m          },[m
[32m+[m[32m        ][m
[32m+[m[32m      : [[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "1",[m
[32m+[m[32m            label: "Student Name",[m
[32m+[m[32m            children: `${data.firstName} ${data.lastName}` || "Not Available",[m
[32m+[m[32m          },[m
[32m+[m[32m          {[m
[32m+[m[32m            key: "2",[m
[32m+[m[32m            label: "Student ID",[m
[32m+[m[32m            children: data.studentCode || "Not Available",[m
[32m+[m[32m          },[m
[32m+[m[32m          { key: "3", label: "Class", children: data.class || "Not Available" },[m
[32m+[m[32m          { key: "4", label: "Email", children: data.email || "Not Available" },[m
[32m+[m[32m          { key: "5", label: "Phone", children: data.phone || "Not Available" },[m
[32m+[m[32m        ];[m
[32m+[m
[32m+[m[32m  return ([m
[32m+[m[32m    <div>[m
[32m+[m[32m      <p className="text-[30px] text-black font-bold">[m
[32m+[m[32m        {type == TableType.SESSION[m
[32m+[m[32m          ? "Session information"[m
[32m+[m[32m          : "Student information"}[m
[32m+[m[32m      </p>[m
[32m+[m[32m      <p className="text-[18px] text-[#637381] font-medium mt-[10px]">[m
[32m+[m[32m        {type == TableType.SESSION[m
[32m+[m[32m          ? "Track student request and participation."[m
[32m+[m[32m          : "View student details."}[m
[32m+[m[32m      </p>[m
[32m+[m[32m      <div className="w-full">[m
[32m+[m[32m        <Card className="w-full h-full px-4 py-0 md:px-14 md:py-6 shadow-md mt-8 flex justify-center">[m
[32m+[m[32m          <Descriptions[m
[32m+[m[32m            size="small"[m
[32m+[m[32m            column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}[m
[32m+[m[32m            items={items}[m
[32m+[m[32m            labelStyle={{[m
[32m+[m[32m              width: "130px",[m
[32m+[m[32m              fontWeight: "bold",[m
[32m+[m[32m              padding: "5px",[m
[32m+[m[32m            }}[m
[32m+[m[32m            contentStyle={{[m
[32m+[m[32m              width: "200px",[m
[32m+[m[32m              fontWeight: "bold",[m
[32m+[m[32m              padding: "5px",[m
[32m+[m[32m            }}[m
[32m+[m[32m            className="max-w-[400px] md:max-w-full flex justify-center"[m
[32m+[m[32m          />[m
[32m+[m[32m        </Card>[m
[32m+[m[32m        <Divider className="mt-16" />[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </div>[m
[32m+[m[32m  );[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mexport default Details;[m
