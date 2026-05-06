import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import useAxios from '../utils/useAxios';
import { imgBaseUrl } from "../utils/axiosInstance"; 
import { useAuth } from '../context/AuthContext';
import { colors } from "../variables/colors";
import { formatCurrency } from "../utils";
import Table from "../component/Table";

// Modal component imports
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import apiRoutes from '../variables/apiRoutes';
import { defaultStylesSidebar } from '../constants/colors';

function WithdrawHistoryPage() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const { setloading } = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchRoiHistory = async () => {
      setloading(true)
      try {
        const res = await fetchData({
          url: apiRoutes.requestHistory,
        });
        console.log('Withdrawal history', res);
        setData(res.data || []);
        setloading(false)
      } catch (error) {
        console.error('Error fetching Withdraw History:', error);
        setloading(false)
      }
    };

    if (userId) fetchRoiHistory();
  }, [userId]);

  // Modal style for MUI
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const handleImageClick = (imageUrl, title) => {
    setModalImage(imageUrl);
    setModalTitle(title);
    setModalVisible(true);
  };

  const columns = [
    {
      key: 'userId',
      title: 'User Id',
      sortable: true,
      filterable: true,
      render: (userId) => <>{userId}</>,
    },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      filterable: true,
      render: (amount) => <>{formatCurrency(amount)}</>,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (status) => {
        let bgColor = "bg-gray-500";
        if (status === "approved" || status === "success") bgColor = "bg-green-500";
        else if (status === "pending") bgColor = "bg-yellow-500 text-black";
        else if (status === "rejected") bgColor = "bg-red-500";

        return (
          <span className={`px-2 py-1 rounded text-white ${bgColor}`}>
            {status}
          </span>
        );
      },
    },
      {
      key: 'accountNumber',
      title: 'Account Number',
      sortable: true,
      filterable: true,
      render: (accountNumber) => <>{accountNumber}</>,
    },
    {
      key: 'bankName',
      title: 'Bank Name',
      sortable: true,
      filterable: true,
      render: (bankName) => <>{bankName}</>,
    },
    {
      key: 'bankName',
      title: 'Bank Name',
      sortable: true,
      filterable: true,
      render: (bankName) => <>{bankName}</>,
    },
    {
      key: 'createdAt',
      title: 'Date',
      sortable: true,
      filterable: true,
      render: (createdAt) => <>{createdAt}</>,
    },
  ];

  return (
    <div className=''>
      <div className="min-h-screen">
        <div className="p-4 md:p-6">
          <h2 className={`text-xl md:text-2xl font-bold text-center text-[${defaultStylesSidebar.cardbg}] mb-4`}>
            Withdrawal History
          </h2>

          <Table
            columns={columns}
            data={data}
            pageSize={5}
            searchable={true}
            filterable={true}
            striped={true}
            hoverable={true}
            className="mt-6"
          />

          {/* Material-UI Modal for large image */}
          <Modal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <div className="flex justify-between items-center w-full mb-4">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {modalTitle}
                </Typography>
                <IconButton 
                  aria-label="close" 
                  onClick={() => setModalVisible(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <img
                src={modalImage}
                alt="Document"
                className="max-h-[70vh] max-w-full object-contain"
              />
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default WithdrawHistoryPage;

