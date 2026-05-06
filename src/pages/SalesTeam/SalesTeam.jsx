// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import useAxios from "../../utils/useAxios";
// import { useAuth } from "../../context/AuthContext";

// // Tooltip
// const Tooltip = ({ user, position }) => {
//   if (!user) return null;
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -5 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="absolute z-50 bg-white shadow-lg rounded-xl p-3 text-sm w-80 border border-gray-200"
//       style={{ top: position.y, left: position.x }}
//     >
//       <h3 className="font-bold text-blue-600 mb-2">
//         {user.name || "N/A"} ({user.userId})
//       </h3>
//       <div className="grid grid-cols-2 gap-2 text-xs">
//         <p><b>UserId:</b> {user.userId}</p>
//         <p><b>Name:</b> {user.name}</p>
//         <p><b>Email:</b> {user.email}</p>
//         <p><b>Phone:</b> {user.phone}</p>
//         <p><b>Total Purchase:</b> {user.totalPurchaseAmount}</p>
//         <p><b>Wallet:</b> {user.walletBalance}</p>
//         <p><b>Join Date:</b> {new Date(user.createdAt).toLocaleDateString()}</p>
//         <p><b>Status:</b> {user.isActivated ? "Active" : "Deactivate"}</p>
//       </div>
//     </motion.div>
//   );
// };

// // Node
// const TreeNode = ({ user, onClick, onHover, isEmpty, boxClass }) => (
//   <div className="relative flex flex-col items-center">
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       onMouseEnter={(e) => !isEmpty && onHover(user, e)}
//       onMouseLeave={() => onHover(null, null)}
//       onClick={() => !isEmpty && onClick(user._id)}
//       className={`cursor-pointer rounded-xl shadow-md text-center ${
//         isEmpty
//           ? "bg-gray-200 text-gray-400 cursor-default"
//           : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//       } ${boxClass || "w-40 px-4 py-2"}`}
//     >
//       <p className="font-semibold">{isEmpty ? "Empty" : user.name}</p>
//       <p className="text-xs">({isEmpty ? "-" : user.userId})</p>
//     </motion.div>
//   </div>
// );

// // Recursive Tree with L-shaped connectors
// const UserTree = ({ user, onClick, onHover }) => {
//   const hasLeft = !!user.leftChild;
//   const hasRight = !!user.rightChild;

//   return (
//     <div className="flex flex-col items-center relative">
//       {/* Parent Node */}
//       <TreeNode user={user} onClick={onClick} onHover={onHover} />

//       {(hasLeft || hasRight) && (
//   <div className="relative flex mt-6 w-full justify-between gap-6"> {/* horizontal gap */}
//     {/* Vertical line from parent down */}
//     <div className="absolute top-0 left-1/2 w-px h-6 bg-gray-400 z-0"></div>

//     {/* Horizontal connector */}
//     <div className="absolute top-6 left-0 right-0 h-px bg-gray-400 z-0"></div>

//     {/* Left Child */}
//     <div className="flex flex-col items-center flex-1 z-10">
//       <div className="w-px h-12 bg-gray-400 mb-2"></div> {/* vertical gap from parent */}
//       <TreeNode
//         user={hasLeft ? user.leftChild : null}
//         onClick={onClick}
//         onHover={onHover}
//         isEmpty={!hasLeft}
//         boxClass="w-32 px-3 py-1" // smaller box
//       />
//     </div>

//     {/* Right Child */}
//     <div className="flex flex-col items-center flex-1 z-10">
//       <div className="w-px h-12 bg-gray-400 mb-2"></div> {/* vertical gap from parent */}
//       <TreeNode
//         user={hasRight ? user.rightChild : null}
//         onClick={onClick}
//         onHover={onHover}
//         isEmpty={!hasRight}
//         boxClass="w-32 px-3 py-1" // smaller box
//       />
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// // Main Page
// const SalesTeam = () => {
//   const { userData, setloading } = useAuth();
//   const { fetchData } = useAxios();
//   const [treeData, setTreeData] = useState(null);
//   const [hoveredUser, setHoveredUser] = useState(null);
//   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
//   const [searchId, setSearchId] = useState("");

//   const fetchUserTree = async (userId) => {
//     setloading(true);
//     try {
//       const res = await fetchData({
//         url: `/api/v1/user/profile/get-left-right-user/${userId}`,
//       });
//       if (res?.data) setTreeData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//     setloading(false);
//   };

//   useEffect(() => {
//     if (userData?.id) fetchUserTree(userData.id);
//   }, [userData]);

//   const handleHover = (user, e) => {
//     if (user) {
//       const rect = e.currentTarget.getBoundingClientRect();
//       setTooltipPos({ x: rect.right + 15, y: rect.top });
//       setHoveredUser(user);
//     } else {
//       setHoveredUser(null);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50 py-10 px-6 overflow-x-auto">


//       {/* Tree */}
//       {treeData ? (
//         <div className="flex justify-start">
//           <UserTree
//             user={treeData}
//             onClick={(id) => fetchUserTree(id)}
//             onHover={handleHover}
//           />
//         </div>
//       ) : (
//         <p className="text-gray-500">Not Found</p>
//       )}

//       {/* Tooltip */}
//       {hoveredUser && <Tooltip user={hoveredUser} position={tooltipPos} />}
//     </div>
//   );
// };

// export default SalesTeam;





import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import useAxios from "../../utils/useAxios";
import { useAuth } from "../../context/AuthContext";
import { UserRound } from "lucide-react";
import { defaultStylesSidebar } from "../../constants/colors";

const formatCurrency = (amount) =>
  `Rs ${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0))}`;

// ---------------- Custom Node ----------------
const CustomNode = ({ nodeDatum, onNodeClick, onNodeMouseOver, onNodeMouseOut }) => {
  const isRoot = nodeDatum.__rd3t.depth === 0;
  const isEmpty = nodeDatum.attributes?.isEmpty;

  return (
    <g>
      {/* Circle Node */}
      <circle
        r="25"
        fill={isEmpty ? "#f8fafc" : isRoot ? defaultStylesSidebar.cardbg : defaultStylesSidebar.cardbg }
        stroke={isEmpty ? "#cbd5e1" : "#1d4ed8"}
        strokeWidth="1.5"
        className="cursor-pointer"
        onClick={() => !isEmpty && onNodeClick(nodeDatum)}
        onMouseOver={(e) => !isEmpty && onNodeMouseOver(nodeDatum, e)}
        onMouseOut={onNodeMouseOut}
      />

      {/* User Icon inside circle */}
      {!isEmpty && (
        <foreignObject x="-15" y="-15" width="30" height="30" style={{ pointerEvents: "none" }}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full">
            <UserRound className="w-6 h-6 text-white" />
          </div>
        </foreignObject>
      )}

      {/* Name & ID next to circle */}
      <foreignObject x="35" y="-24" width="170" height="56" style={{ pointerEvents: "none" }}>
        <div xmlns="http://www.w3.org/1999/xhtml" className="font-sans">
          <div className={`text-sm font-medium ${isEmpty ? "text-gray-400" : "text-gray-800"}`}>
            {isEmpty ? "Empty" : nodeDatum.name || "N/A"}
          </div>
          <div className={`text-xs ${isEmpty ? "text-gray-300" : "text-gray-500"}`}>
            {isEmpty ? "-" : nodeDatum.attributes?.userId || "N/A"}
          </div>
          {!isEmpty && (
            <div className="text-xs text-gray-500">
              Purchase: {formatCurrency(nodeDatum.attributes?.totalPurchaseAmount)}
            </div>
          )}
        </div>
      </foreignObject>
    </g>




  );
};

// ---------------- Tooltip ----------------
const Tooltip = ({ user, position }) => {
  if (!user) return null;

  return (
    <div
      className="fixed z-50 bg-white shadow-xl rounded-lg p-4 text-sm w-80 border border-gray-300"
      style={{ left: position.x + 10, top: position.y + 10 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white"></div>
        <div>
          <h3 className="font-bold text-blue-600">{user.name || "N/A"}</h3>
          <p className="text-xs text-gray-600">{user.userId}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <p><b>Email:</b> {user.email || "N/A"}</p>
        <p><b>Phone:</b> {user.phone || "N/A"}</p>
        <p><b>Total Purchase:</b> {formatCurrency(user.totalPurchaseAmount)}</p>
        <p><b>Join:</b> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        <p><b>Status:</b>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${user.isActivated ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
            {user.isActivated ? "Active" : "Inactive"}
          </span>
        </p>
      </div>
    </div>
  );
};

// ---------------- Helpers ----------------
const createNode = (user, isEmpty = false) => {
  if (!user || isEmpty) return { name: "Empty", attributes: { isEmpty: true } };

  return {
    name: user.name || "N/A",
    attributes: {
      userId: user.userId,
      email: user.email,
      phone: user.phone,
      totalPurchaseAmount: user.totalPurchaseAmount || 0,
      walletBalance: user.walletBalance,
      createdAt: user.createdAt,
      isActivated: user.isActivated,
      _id: user._id,
      isEmpty: false,
    },
    children: [],
  };
};

// Recursively find a node by ID and attach children
const addChildrenToNode = (tree, nodeId, leftChild, rightChild) => {
  if (!tree) return null;
  if (tree.attributes?._id === nodeId) {
    tree.children = [
      leftChild ? createNode(leftChild) : createNode(null, true),
      rightChild ? createNode(rightChild) : createNode(null, true),
    ];
    return tree;
  }
  if (tree.children && tree.children.length) {
    tree.children = tree.children.map((child) =>
      addChildrenToNode(child, nodeId, leftChild, rightChild)
    );
  }
  return tree;
};

// ---------------- Main Component ----------------
const SalesTeam = () => {
  const { userData, setloading } = useAuth();
  const { fetchData } = useAxios();
  const [treeData, setTreeData] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [searchId, setSearchId] = useState("");

  // Initial Load
  useEffect(() => {
    if (userData?.id) loadUserTree(userData.id, true);
  }, [userData]);

  // Load user or expand existing node
  const loadUserTree = async (userId, isRoot = false) => {
    setloading(true);
    try {
      const res = await fetchData({
        url: `/api/v1/user/profile/get-left-right-user/${userId}`,
      });
      const user = res?.data;

      if (!user) return;

      if (isRoot) {
        const root = createNode(user);
        root.children.push(
          user.leftChild ? createNode(user.leftChild) : createNode(null, true)
        );
        root.children.push(
          user.rightChild ? createNode(user.rightChild) : createNode(null, true)
        );
        setTreeData(root);
      } else {
        setTreeData((prevTree) =>
          JSON.parse(
            JSON.stringify(
              addChildrenToNode(
                { ...prevTree },
                userId,
                user.leftChild,
                user.rightChild
              )
            )
          )
        );
      }
    } catch (err) {
      console.error("Error fetching user tree:", err);
    }
    setloading(false);
  };

  // Handlers
  const handleNodeClick = (nodeDatum) => {
    if (nodeDatum.attributes?.isEmpty) return;
    const userId = nodeDatum.attributes._id;
    const alreadyExpanded = nodeDatum.children?.some(
      (child) => !child.attributes?.isEmpty
    );
    if (!alreadyExpanded) loadUserTree(userId, false);
  };

  const handleNodeMouseOver = (nodeDatum, event) => {
    if (nodeDatum.attributes?.isEmpty) return;
    setHoveredUser({ ...nodeDatum.attributes, name: nodeDatum.name });
    setTooltipPos({ x: event.clientX, y: event.clientY });
  };

  const handleNodeMouseOut = () => setHoveredUser(null);

  // Search
  const handleSearch = () => {
    if (searchId) loadUserTree(searchId, true);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Structure</h1>
          <p className="text-gray-600 text-sm">Click a node to expand children</p>
        </div>

        {/* Search */}
        {/* <div className="flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter User ID"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={!searchId}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
          <button
            onClick={() => userData?.id && loadUserTree(userData.id, true)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        </div> */}
      </div>

      {/* Tree */}
      <div className="w-full h-[calc(100vh-80px)] relative">
        {treeData ? (
          <Tree
            data={treeData}
            renderCustomNodeElement={(props) => (
              <CustomNode
                {...props}
                onNodeClick={handleNodeClick}
                onNodeMouseOver={handleNodeMouseOver}
                onNodeMouseOut={handleNodeMouseOut}
              />
            )}
            orientation="vertical"
            translate={{ x: 500, y: 150 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            pathClassFunc={() => "tree-path"}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Loading team structure...</p>
          </div>
        )}

        {/* Tooltip */}
        {hoveredUser && <Tooltip user={hoveredUser} position={tooltipPos} />}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <div className="w-4 h-4 bg-blue-500 rounded"></div><span>Root User</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <div className="w-4 h-4 bg-blue-700 rounded"></div><span>Child User</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 bg-gray-300 rounded"></div><span>Empty Position</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tree-path {
          stroke: #6b7280;
          stroke-width: 2;
          fill: none;
        }
      `}</style>
    </div>
  );
};

export default SalesTeam;
