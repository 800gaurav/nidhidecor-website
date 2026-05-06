import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Avatar,
  Tag,
  Divider,
  Spin,
  Statistic,
  Grid,
  Modal,
  Input
} from "antd";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  IdCard,
  Shield,
  Award,
  Wallet,
  Edit,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  CreditCard,
} from "lucide-react";
import useAxios from "../../utils/useAxios";
import { toast } from "react-toastify";
import { defaultStylesSidebar } from "../../constants/colors";
 
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
 
/* ────────────────────────────────────────────────────────────────
   ID Card Component (canvas-based, downloadable)
──────────────────────────────────────────────────────────────── */
const IDCard = ({ userData, formatDate, onClose }) => {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);
 

  // Logo image draw karna

  const drawCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
 
    // Card dimensions (credit-card ratio ≈ 85.6 × 54 mm → scale up)
    canvas.width = 760;
    canvas.height = 460;
 
    const W = canvas.width;
    const H = canvas.height;
 
    /* ── Background gradient ── */
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0f172a");
    bg.addColorStop(0.5, "#1e3a5f");
    bg.addColorStop(1, "#0f2027");
    ctx.fillStyle = bg;
    roundRect(ctx, 0, 0, W, H, 24);
    ctx.fill();
 
    /* ── Decorative circles ── */

 
    /* ── Gold top stripe ── */
    const stripe = ctx.createLinearGradient(0, 0, W, 0);
    stripe.addColorStop(0, "#f59e0b");
    stripe.addColorStop(0.5, "#fbbf24");
    stripe.addColorStop(1, "#f59e0b");
    ctx.fillStyle = stripe;
    roundRect(ctx, 0, 0, W, 8, { tl: 24, tr: 24, bl: 0, br: 0 });
    ctx.fill();
 
    /* ── Company name ── */
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 20px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("DHANTAG INDIA PVT. LTD", W / 2, 65);
 
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "12px Arial";
    ctx.fillText("Member Identification Card", W / 2, 82);
 
    /* ── Divider line ── */
    ctx.beginPath();
    ctx.moveTo(30, 120);
    ctx.lineTo(W - 30, 120);
    ctx.strokeStyle = "rgba(251,191,36,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();
 
    /* ── Avatar circle ── */
    const avatarX = 90;
    const avatarY = 240;
    const avatarR = 70;
 
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR + 4, 0, Math.PI * 2);
    const ringGrad = ctx.createLinearGradient(
      avatarX - avatarR, avatarY - avatarR,
      avatarX + avatarR, avatarY + avatarR
    );
    ringGrad.addColorStop(0, "#fbbf24");
    ringGrad.addColorStop(1, "#3b82f6");
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
 
    // Avatar fill (initials)
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.clip();
    const avatarBg = ctx.createRadialGradient(avatarX, avatarY, 0, avatarX, avatarY, avatarR);
    avatarBg.addColorStop(0, "#1d4ed8");
    avatarBg.addColorStop(1, "#0f172a");
    ctx.fillStyle = avatarBg;
    ctx.fillRect(avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
 
    // Load profile picture if available
    if (userData.profilePicture) {
      try {
        await loadImage(ctx, userData.profilePicture, avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2, avatarR);
      } catch {
        drawInitial(ctx, userData.name, avatarX, avatarY, avatarR);
      }
    } else {
      drawInitial(ctx, userData.name, avatarX, avatarY, avatarR);
    }
    ctx.restore();
 
    /* ── Main info block ── */
    const infoX = 200;
    let infoY = 150;
 
    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Georgia, serif";
    ctx.textAlign = "left";
    ctx.fillText(userData.name || "", infoX, infoY);
    infoY += 40;
 
    // Info pills
    const pills = [
      { label: "USER ID", value: userData.userId || "-", icon: "🪪" },
      { label: "SPONSOR", value: userData.sponsor || "-", icon: "🏷️" },
      { label: "MEMBER SINCE", value: formatDate(userData.createdAt), icon: "📅" },
      { label: "GENDER", value: userData.gender || "-", icon: "👤" },
    ];
 
    pills.forEach((pill, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const px = infoX + col * 270;
      const py = infoY + row * 70;
 
      // Pill background
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, px, py, 250, 52, 10);
      ctx.fill();
      ctx.restore();
 
      // Border
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1;
      roundRect(ctx, px, py, 250, 52, 10);
      ctx.stroke();
      ctx.restore();
 
      ctx.fillStyle = "rgba(251,191,36,0.8)";
      ctx.font = "bold 9px Arial";
      ctx.textAlign = "left";
      ctx.fillText(pill.label, px + 12, py + 18);
 
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Arial";
      ctx.fillText(`${pill.icon}  ${pill.value}`, px + 12, py + 38);
    });
 
    infoY += 160;
 
    /* ── Bottom: contact info ── */
    const contactY = H - 60;
 
    // Semi-transparent bottom bar
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 24, contactY - 18, W - 48, 44, 10);
    ctx.fill();
    ctx.restore();
 
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "13px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`✉  ${userData.email || "-"}`, 44, contactY + 6);
 
    ctx.textAlign = "center";
    ctx.fillText(`📞  ${userData.phone || "-"}`, W / 2, contactY + 6);
 
    // Status badge (right)
    const statusColor = userData.isActivated ? "#22c55e" : "#f59e0b";
    const statusText = userData.isActivated ? "✓ ACTIVE" : "⏳ PENDING";
    ctx.fillStyle = statusColor;
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "right";
    ctx.fillText(statusText, W - 44, contactY + 6);
 
    /* ── Card ID barcode-style decoration ── */
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let b = 0; b < 18; b++) {
      const bh = 8 + Math.random() * 20;
      ctx.fillRect(W - 170 + b * 8, H - 110 - bh / 2, 4, bh);
    }
 
    setRendered(true);
  };
 
  // Helper: draw text initials in avatar
  const drawInitial = (ctx, name, cx, cy, r) => {
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${r * 0.9}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((name || "U").charAt(0).toUpperCase(), cx, cy);
    ctx.textBaseline = "alphabetic";
  };
 
  // Helper: load image into clipped circle
  const loadImage = (ctx, src, x, y, w, h) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, x, y, w, h);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  };
 
  // Helper: rounded rectangle path
  const roundRect = (ctx, x, y, w, h, r) => {
    if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r };
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
    ctx.closePath();
  };
 
  useEffect(() => {
    drawCard();
  }, [userData]);
 
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `ID_Card_${userData.userId || "member"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("ID Card downloaded successfully! 🎉");
  };
 
  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      width={820}
      centered
      title={
        <div className="flex items-center gap-2">
          <CreditCard size={20} className="text-blue-600" />
          <span className="font-bold text-gray-800">Your Member ID Card</span>
        </div>
      }
      styles={{ body: { padding: "24px", background: "#f8fafc" } }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Canvas Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
          style={{
            perspective: "1000px",
            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.35))",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              borderRadius: "16px",
              display: "block",
            }}
          />
        </motion.div>
 
        {!rendered && (
          <div className="flex items-center gap-2 text-gray-500">
            <Spin size="small" />
            <span>Generating card...</span>
          </div>
        )}
 
        {/* Download button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: rendered ? 1 : 0, y: rendered ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          <Button
            type="primary"
            size="large"
            icon={<Download size={18} />}
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-5 font-bold rounded-xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
              border: "none",
              fontSize: "16px",
            }}
          >
            Download ID Card (PNG)
          </Button>
        </motion.div>
 
        <Text className="text-gray-400 text-xs text-center">
          High-resolution PNG • Suitable for printing or digital use
        </Text>
      </div>
    </Modal>
  );
};
 
/* ────────────────────────────────────────────────────────────────
   Main Profile Component
──────────────────────────────────────────────────────────────── */
const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchData } = useAxios();
  const [savingAddress, setSavingAddress] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const screens = useBreakpoint();
 
  const [addressForm, setAddressForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    postOffice: "",
    country: ""
  });
 
  const openAddressModal = () => {
    if (userData.address) {
      setAddressForm({ ...userData.address });
    }
    setIsAddressModalOpen(true);
  };
 
  const handleAddressUpdate = async () => {
    try {
      setSavingAddress(true);
      const payload = {
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        district: addressForm.district,
        state: addressForm.state,
        postOffice: addressForm.postOffice,
        pincode: addressForm.pincode,
        country: addressForm.country
      };
 
      const res = await fetchData({
        url: "/api/v1/user/auth/update-address",
        method: "PUT",
        data: payload,
        headers: { "Content-Type": "application/json" }
      });
      if (res.success) {
        toast.success("Address updated successfully!");
        setIsAddressModalOpen(false);
        fetchProfileData();
      } else {
        toast.error(res.message || "Failed to update address");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSavingAddress(false);
    }
  };
 
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await fetchData({
        url: `/api/v1/user/profile/get-profile`,
        method: "GET",
      });
      if (res.success) {
        setUserData(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchProfileData();
  }, []);
 
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
 
  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } }
  };
 
  const getStatusConfig = (status) => {
    const config = {
      pending: { color: "orange", text: "Pending", icon: Clock },
      approved: { color: "green", text: "Approved", icon: CheckCircle },
      rejected: { color: "red", text: "Rejected", icon: XCircle }
    };
    return config[status] || config.pending;
  };
 
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
 
  const formatPhone = (phone) => {
    return String(phone).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <Text className="block mt-4 text-gray-600 text-lg">Loading your profile...</Text>
        </div>
      </div>
    );
  }
 
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto text-red-500 mb-4" size={64} />
          <Title level={3} className="text-gray-800 mb-2">Error loading profile</Title>
          <Button type="primary" size="large" onClick={fetchProfileData} className="mt-4 bg-blue-600">
            Try Again
          </Button>
        </div>
      </div>
    );
  }
 
  const InfoSection = ({ title, icon: Icon, color, children }) => (
    <motion.div variants={fadeIn}>
      <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 bg-white rounded-2xl h-full">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 rounded-xl shadow-md" style={{ backgroundColor: color, color: 'white' }}>
            <Icon size={24} />
          </div>
          <Title level={4} className="m-0 text-gray-800 font-bold">{title}</Title>
        </div>
        {children}
      </Card>
    </motion.div>
  );
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
 
        {/* Address Modal */}
        <Modal
          title={<span className="text-xl font-semibold text-gray-800">Update Address</span>}
          open={isAddressModalOpen}
          onCancel={() => setIsAddressModalOpen(false)}
          onOk={handleAddressUpdate}
          okText="Save"
          okButtonProps={{
            style: {
              background: defaultStylesSidebar.cardbg,
              color: '#fff',
              fontWeight: '600',
              borderRadius: '8px',
            },
            loading: savingAddress,
          }}
          cancelButtonProps={{
            className: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg',
          }}
          centered
          width={600}
          bodyStyle={{ padding: '24px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Address Line 1", key: "addressLine1" },
              { label: "Address Line 2", key: "addressLine2" },
              { label: "City", key: "city" },
              { label: "District", key: "district" },
              { label: "State", key: "state" },
              { label: "Pincode", key: "pincode" },
              { label: "Post Office", key: "postOffice" },
            ].map((field) => (
              <div key={field.key} className="flex flex-col">
                <label className="text-gray-600 font-medium mb-1">{field.label}</label>
                <Input
                  value={addressForm[field.key]}
                  placeholder={field.label}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="rounded-lg border-gray-300"
                />
              </div>
            ))}
          </div>
        </Modal>
 
        {/* ID Card Modal */}
        {showIDCard && (
          <IDCard
            userData={userData}
            formatDate={formatDate}
            onClose={() => setShowIDCard(false)}
          />
        )}
 
        {/* ── Header Section ── */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
 
            <Row gutter={[32, 32]} align="middle" className="relative z-10">
              <Col xs={24} md={6} className="text-center">
                <div className="relative inline-block">
                  <Avatar
                    size={140}
                    className="bg-white text-blue-600 text-4xl font-bold border-4 border-white shadow-2xl"
                    src={userData.profilePicture}
                  >
                    {userData.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${userData.isActivated ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {userData.isActivated ? (
                      <CheckCircle size={20} className="text-white" />
                    ) : (
                      <Clock size={20} className="text-white" />
                    )}
                  </div>
                </div>
              </Col>
 
              <Col xs={24} md={12}>
                <div className="text-white">
                  <Title level={1} className="mb-3 font-bold text-4xl" style={{ color: "white" }}>
                    {userData.name}
                  </Title>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white bg-opacity-10 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <IdCard size={20} className="text-blue-200" />
                      <div>
                        <Text strong className="text-blue-200 text-sm">User ID</Text>
                        <div className="text-black font-mono font-bold text-base">{userData.userId}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award size={20} className="text-blue-200" />
                      <div>
                        <Text strong className="text-blue-200 text-sm">Sponsor Code</Text>
                        <div className="text-black font-mono font-bold text-base">{userData.sponsor}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-blue-200" />
                      <div>
                        <Text strong className="text-blue-200 text-sm">Member Since</Text>
                        <div className="text-black font-semibold text-base">{formatDate(userData.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-blue-200" />
                      <div>
                        <Text strong className="text-blue-200 text-sm">Status</Text>
                        <div className={`font-bold text-base ${userData.isActivated ? 'text-green-300' : 'text-yellow-300'}`}>
                          {userData.isActivated ? 'Active' : 'Pending Activation'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
 
              {/* ID Card Button */}
              <Col xs={24} md={6} className="flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="large"
                    icon={<CreditCard size={20} />}
                    onClick={() => setShowIDCard(true)}
                    className="flex items-center gap-2 font-bold px-6 py-6 rounded-2xl shadow-2xl border-2"
                    style={{
                      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                      border: "2px solid rgba(255,255,255,0.4)",
                      color: "#1e3a5f",
                      fontSize: "15px",
                      height: "auto",
                    }}
                  >
                    View ID Card
                  </Button>
                </motion.div>
 
                {!userData.isActivated && (
                  <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 rounded-xl p-3 text-center">
                    <Clock size={18} className="text-yellow-300 mx-auto mb-2" />
                    <Text className="text-yellow-200 text-sm">Account awaiting activation</Text>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </motion.div>
 
        {/* ── Main Content Grid ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <Row gutter={[24, 24]}>
 
            {/* Personal Information */}
            <Col xs={24} lg={12}>
              <InfoSection title="Personal Information" icon={User} color="#3b82f6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Text strong className="text-gray-600 text-sm">Full Name</Text>
                      <div className="text-gray-800 font-semibold text-lg">{userData.name}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Text strong className="text-gray-600 text-sm">Date of Birth</Text>
                      <div className="text-gray-800 font-semibold">{formatDate(userData.dateOfBirth)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Text strong className="text-gray-600 text-sm">Gender</Text>
                      <Tag color="blue" className="m-0 font-semibold">{userData.gender}</Tag>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Text strong className="text-gray-600 text-sm">Marital Status</Text>
                      <Tag color={userData.maritalStatus === 'married' ? 'green' : 'blue'} className="m-0 font-semibold">
                        {userData.maritalStatus || "-"}
                      </Tag>
                    </div>
                  </div>
                  <Divider className="my-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <Mail size={20} className="text-blue-600" />
                      <div>
                        <Text strong className="text-gray-600 text-sm">Email</Text>
                        <div className="text-gray-800 font-semibold">{userData.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <Phone size={20} className="text-green-600" />
                      <div>
                        <Text strong className="text-gray-600 text-sm">Phone</Text>
                        <div className="text-gray-800 font-semibold">{formatPhone(userData.phone)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoSection>
            </Col>
 
            {/* Address Information */}
            <Col xs={24} lg={12}>
              <InfoSection title="Address Details" icon={Home} color="#10b981">
                {userData.address ? (
                  <div className="space-y-4 relative">
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                      <MapPin size={24} className="text-green-600 mt-1 flex-shrink-0" />
                      <div className="text-gray-800">
                        <div className="font-bold text-lg mb-2">{userData.address.addressLine1}</div>
                        {userData.address.addressLine2 && (
                          <div className="mb-2 text-gray-700">{userData.address.addressLine2}</div>
                        )}
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>📍 {userData.address.city}, {userData.address.district}</div>
                          <div>🏛️ {userData.address.state} - {userData.address.pincode}</div>
                          <div>📮 Post Office: {userData.address.postOffice}</div>
                          <div>🇮🇳 Country: India</div>
                        </div>
                      </div>
                    </div>
                    <Button
                      style={{ background: defaultStylesSidebar.background }}
                      size="small"
                      className="absolute top-2 right-2 py-3 px-6 !text-white"
                      onClick={openAddressModal}
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin size={64} className="text-gray-300 mx-auto mb-4" />
                    <Text className="text-gray-500 text-lg mr-2">No address information available</Text>
                    <Button
                      type="primary"
                      className="mt-4"
                      style={{ background: defaultStylesSidebar.cardbg }}
                      onClick={openAddressModal}
                    >
                      Add Address
                    </Button>
                  </div>
                )}
              </InfoSection>
            </Col>
 
          </Row>
        </motion.div>
      </div>
    </div>
  );
};
 
export default MyProfile;
