import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import html2pdf from 'html2pdf.js';
import useAxios from '../../utils/useAxios';
import { calculateAge } from '../../utils';
import { defaultStylesSidebar } from '../../constants/colors';

const Agreement = () => {
  const { userData } = useAuth();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [data, setData] = useState(null);
  const { fetchData } = useAxios();
  const contentRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData({
          url: "/api/v1/user/profile/get-profile"
        });
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const agreementData = {
    companyName: "DHANTAG INDIA PVT LTD",
    companyAddress: "Manglam, Block-C, Hathoj Kalwar Road, Jhotwara Jaipur - 302012",
    website: "https://dhantag.com/",
    registeredOffice: "Shop No. G-23 Manglam, Block-C, Hathoj Jhotwara Jaipur - 302012",
    agreementDate: new Date().toLocaleDateString('en-GB'),
    directSeller: {
      name: data?.name || userData?.name || "",
      sellerId: data?.sellerId || userData?.sellerId || "DS001"
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    if (typeof address === 'string') return address;
    
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.postOffice,
      address.city,
      address.district,
      address.state,
      address.pincode
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(', ');
  };

  // Alternative handlePrintPDF function - replace the existing one
const handlePrintPDF = async () => {
  if (!data) {
    alert('Please wait while loading profile data...');
    return;
  }

  setIsGeneratingPDF(true);

  try {
    // Get the element
    const element = document.getElementById('agreement-content');
    
    // Store original content
    const originalHTML = element.innerHTML;
    
    // Create a clean version for PDF
    const cleanHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Agreement - ${agreementData.directSeller.name}</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              line-height: 1.6;
              color: #000;
              margin: 0;
              padding: 20px;
            }
            .page-break {
              page-break-before: always;
            }
            .avoid-page-break {
              page-break-inside: avoid;
            }
            @media print {
              .no-print {
                display: none !important;
              }
            }
            h1, h2, h3 {
              margin-top: 20px;
              margin-bottom: 10px;
            }
            p {
              margin-bottom: 10px;
            }
            ol, ul {
              margin-left: 20px;
              margin-bottom: 10px;
            }
            .signature {
              margin-top: 50px;
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 50px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          ${element.outerHTML.replace(/pdf-button-container/g, 'no-print')}
        </body>
      </html>
    `;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(cleanHTML);
    printWindow.document.close();
    
    // Wait for content to load
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
      setIsGeneratingPDF(false);
    };
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try the print dialog instead.');
    setIsGeneratingPDF(false);
  }
};

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agreement data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* PDF Download Button */}
      <div className="max-w-4xl mx-auto mb-6 pdf-button-container">
        <div className="flex justify-end">
          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-2 px-6 py-3 !text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: defaultStylesSidebar.background}}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Agreement Content */}
      <div 
        ref={contentRef}
        id="agreement-content"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Page 1 */}
        <div className="p-8 avoid-page-break">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 bg-blue-600 flex-1"></div>
              <h1 className="text-3xl font-bold text-gray-800 mx-4">
                <u>AGREEMENT</u>
              </h1>
              <div className="h-1 bg-blue-600 flex-1"></div>
            </div>
            <p className="text-sm text-gray-600">Agreement Date: {agreementData.agreementDate}</p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-justify mb-4">
              <strong>
                This agreement is signed on {agreementData.agreementDate} between {agreementData.companyName},
                a company registered under the Companies Act 2013 having its Registered office at {agreementData.companyAddress}
                acting through its Director hereinafter called Company (which expression shall, unless repugnant to the context,
                include its successors in business, administrators, liquidators and assigns or legal representatives) of the FIRST PARTY
              </strong>
            </p>

            <div className="my-6 text-center">
              <div className="inline-block px-8 py-2 bg-gray-100 rounded-lg">
                <h4 className="text-lg font-bold text-gray-700">AND</h4>
              </div>
            </div>

            <p className="text-justify">
              <strong>
                Shri/Smt. {data?.name} aged {calculateAge(data?.dateOfBirth)} years, Address:&nbsp;
                {formatAddress(data?.address) || 'Address not available'} &nbsp;
                (hereinafter called as Direct Seller which expression shall include
                my/our heirs, executors and administrators estates assigns and effects wherein the context so admits or
                requires) of the SECOND PARTY
              </strong>
            </p>
          </div>

          {/* Definitions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              <u>Definitions:</u>
            </h2>
            <p className="mb-4">
              The following words used in these presents shall have the meaning as defined here under:
            </p>

            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>"ACT"</strong> means the consumer protection Act, 1986(68 of 1986)</li>
              <li><strong>"Consumer"</strong> means who buys goods or services for personal (self) use and not for resale or commercial purpose and shall have the same meaning as provided under the Consumer Protection Act, 1986.</li>
              <li><strong>"Prospect"</strong> means a person to whom an offer or a proposal is made by the Direct seller to join a Direct selling opportunity.</li>
              <li><strong>"Direct seller"</strong> means a person appointed or authorized directly or indirectly by a Direct selling Entity through a legally enforceable written contract to undertake direct selling business on principal to principal basis.</li>
              <li><strong>"Network of Direct selling"</strong> means a network of direct sellers at different levels of distribution who may recruit or introduce or sponsor further level of direct sellers who they then support.</li>
              <li><strong>"Direct selling Entity"</strong> means an entity not being engaged in a pyramid scheme, which sells or offers to sell goods or services through a direct seller.</li>
              <li><strong>"Goods"</strong> means goods/products defined in the Sale of Goods Act, 1930 and section 3(26) of the General Clauses Act, 1897.</li>
              <li><strong>"Saleable"</strong> shall mean, with respect to goods and/or services, unused and marketable, which has not expired and which is not seasonal, discontinued or special promotion goods and/or services.</li>
              <li><strong>"Cooling off period"</strong> means the duration of time counted from the date when the direct seller and the direct selling entity enter into an agreement under clause 4.</li>
              <li><strong>"Pyramid Scheme"</strong> means a multi layered network of subscribers to a scheme formed of subscribers enrolling one or more subscribers.</li>
              <li><strong>"Money circulation Scheme"</strong> has the same meaning as defined under the prize chits and Money circulation Scheme Act 1978.</li>
              <li><strong>"Remuneration System"</strong> means the system followed by the direct selling entity to compensate the direct seller.</li>
              <li><strong>"Direct Selling Entity/Company"</strong> means a Company namely M/s {agreementData.companyName} and running its main business in the name and style of DHANTAG.</li>
              <li><strong>"Sales incentive"</strong> means amount of any type of remuneration like commission, Bonus, Gifts, profits, Incentives etc.</li>
              <li><strong>"Unique ID"</strong> means unique identification number issued by the Company to the Direct Seller.</li>
              <li><strong>"Password"</strong> means unique code allotted to each Direct Seller to allow them to log on to the website of the Company.</li>
              <li><strong>"Website"</strong> means official website of the Company {agreementData.website}</li>
            </ol>
          </div>

          {/* Page 1 Signature */}
          <div className="mt-16 pt-4 border-t border-gray-300">
            <div className="text-right">
              <p className="mb-2">Signature: ________________________</p>
              <p className="font-semibold text-gray-700">{agreementData.directSeller.name}</p>
              <p className="text-sm text-gray-600">Direct Seller</p>
            </div>
          </div>
        </div>

        {/* Page Break for PDF */}
        <div className="page-break"></div>

        {/* Page 2 */}
        <div className="p-8 avoid-page-break">
          <div className="mb-8">
            <p className="text-justify">
              <strong>WHEREAS</strong> M/s {agreementData.companyName}, a Company incorporated under the Companies Act, 2013,
              having its Registered Office at {agreementData.registeredOffice} hereinafter referred to as The Company.
              "{agreementData.companyName}" takes immense pleasure in introducing first ever Retail concept
              with maximum benefit for customers. The Company is engaged into the business of direct selling
              through its Direct Seller and Retail Outlets as stated in the Object Clauses of memorandum
              of Association of the Company.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                <u>I. The Appointment/Authorization for Direct seller</u>
              </h3>
              <p className="mb-3">That for appointment/Authorization for Direct seller in the company, prospect shall complete the following steps:</p>
              <ol className="list-[lower-alpha] pl-8 space-y-2">
                <li>Fill the application form online and upload scanned KYC documents</li>
                <li>Accept the proposed terms and condition of the agreement and create this agreement using digital signature/one time password/affix digital sign/scanned signature, whatever means of the technology.</li>
                <li>After creation the agreement, he/she shall request for sign of the company through system in technological manner.</li>
                <li>After the putting Signature of the authorized person of the company, the executed and signed agreement shall be displayed and it shall be treated as legal agreement as per the provision of The Indian Contract Act, 1872.</li>
                <li>On the completion of the above process, prospect shall take a printout of the signed agreement.</li>
                <li>Upon the execution of the agreement through the above process, prospect shall become the direct seller of the Company and a Direct seller Unique Identification number and password shall be allotted to the applicant.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                <u>II. Scope of the Work</u>
              </h3>
              <p className="text-justify">
                That the Direct seller shall market and sell the company's product through directly to the end user consumer, using word of mouth publicity, display and/or demonstration of the goods/products, and/or distribution of pamphlets, door to door to customers and other related methods.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                <u>III. Direct Marketing selling</u>
              </h3>
              <ol className="list-[lower-roman] pl-8 space-y-2">
                <li>That the Direct seller shall be responsible for marketing and selling the company's products door to door to customers, directly to the end user consumer using word of mouth publicity, display and/or demonstration of the goods/products, and/or distribution of pamphlets and other related methods.</li>
                <li>That the Direct Seller can use logo and name of the company for selling the company's products as per the company's policy and regulation.</li>
                <li>That the Direct seller would not be allowed to use logo and the name of the company in his personal capacity or personal use.</li>
                <li>That the Direct Seller will get specified %/point, sales Incentive/commission pertaining to the sales for selling the company's products under this Agreement.</li>
              </ol>
            </div>
          </div>

          {/* Page 2 Signature */}
          <div className="mt-16 pt-4 border-t border-gray-300">
            <div className="text-right">
              <p className="mb-2">Signature: ________________________</p>
              <p className="font-semibold text-gray-700">{agreementData.directSeller.name}</p>
              <p className="text-sm text-gray-600">Direct Seller</p>
            </div>
          </div>
        </div>

        {/* Page Break for PDF */}
        <div className="page-break"></div>

        {/* Page 3 */}
        <div className="p-8 avoid-page-break">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                <u>IV. Sales Incentives/Commission Structure or other Benefit</u>
              </h3>
              <p className="mb-3">That the Direct Seller shall enjoy the following privileges:</p>
              <ol className="list-[lower-alpha] pl-8 space-y-2">
                <li>Sales Incentive related to their respective sales volume as per the company's marketing plan for its or tie-up goods/products.</li>
                <li>Earnings of the Direct Seller shall be in proportion to the volume of sales done by the Direct Seller by self or through team (Sales Group) as stipulated in the marketing plan of the Company.</li>
                <li>Marketing/selling of Company's Products in Whole of India. There is No territorial restriction to sale the goods/products.</li>
                <li>With using Unique ID and Password Search and inspect his/her account on website of the Company.</li>
                <li>Working with other Direct Sellers as a Sales Team/Group</li>
                <li>The company shall have no provision that a direct seller will receive remuneration from the recruitment to participate in such direct selling.</li>
                <li>That as per Marketing Plan of the company Sales Incentives/commission structure to be followed for the same.</li>
                <li>That the Company reserves the right to restrict the list of products for a particular Direct Seller.</li>
                <li>That All payments and transactions are to be expressed in Indian Rupees.</li>
                <li>That the Company does not guarantee/assure any facilitation fees or income to the Direct Seller on account of becoming just a mere Direct Seller of the Company.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                <u>V. General terms and conditions</u>
              </h3>
              <ol className="list-[lower-alpha] pl-8 space-y-2">
                <li>That the Direct Seller shall make proper canvassing for the sale of the products in the said areas and for his purpose, the company and Sales Team/Group shall assist the Direct Seller.</li>
                <li>That company will not provide any establishment/office expenses, business running expenses etc. in relation to maintain an owned office for the Direct seller.</li>
                <li>That Direct Seller covenants with the Company that it will exclusively engage in the sale of the company's products and tie-up product and shall not indulge in the sale of similar/identical products.</li>
                <li>That the Company reserves the rights to modify the terms and conditions, products, plan, business and policies with/without giving prior notice.</li>
                <li>That the Direct Seller shall comply with all state and central government and local governing body laws, regulations and codes that apply to the operation of their {agreementData.companyName} business.</li>
              </ol>
            </div>
          </div>

          {/* Page 3 Signature */}
          <div className="mt-16 pt-4 border-t border-gray-300">
            <div className="text-right">
              <p className="mb-2">Signature: ________________________</p>
              <p className="font-semibold text-gray-700">{agreementData.directSeller.name}</p>
              <p className="text-sm text-gray-600">Direct Seller</p>
            </div>
          </div>
        </div>

        {/* Page Break for PDF */}
        <div className="page-break"></div>

        {/* Page 4 - Signature Page */}
        <div className="p-8 avoid-page-break">
          <div className="space-y-8">
            <div>
              <p className="text-justify">
                <strong>IN WITNESS WHEREOF</strong> the parties hereto have caused this Agreement to be executed through their
                respective authorized representatives on the {agreementData.agreementDate}.
              </p>
            </div>

            <div>
              <p>Read over by me/to me and agreed by me on (Date): {agreementData.agreementDate}</p>
            </div>

            <div className="signature-section mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Direct Seller Signature */}
                <div className="border border-gray-300 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-4 text-center">DIRECT SELLER</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="mb-1">Name:</p>
                      <div className="h-8 border-b border-gray-400"></div>
                      <p className="mt-2 font-bold text-center">{agreementData.directSeller.name}</p>
                      <p className="text-sm text-gray-600 text-center">(Name of applicant)</p>
                    </div>
                    <div>
                      <p className="mb-1">Signature:</p>
                      <div className="h-12 border-b border-gray-400"></div>
                    </div>
                    <div>
                      <p className="mb-1">Date:</p>
                      <div className="h-8 border-b border-gray-400"></div>
                    </div>
                  </div>
                </div>

                {/* Company Signature */}
                <div className="border border-gray-300 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-4 text-center">COMPANY</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="mb-1 text-center">Sign and seal of the company</p>
                      <div className="flex justify-center my-4">
                        <div className="w-32 h-32 border-2 border-gray-400 rounded-full flex items-center justify-center">
                          <p className="text-center text-sm">SEAL</p>
                        </div>
                      </div>
                      <p className="text-center font-bold">{agreementData.companyName}</p>
                      <p className="text-center text-sm text-gray-600">Authorized Signatory</p>
                    </div>
                    <div>
                      <p className="mb-1">Date:</p>
                      <div className="h-8 border-b border-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Witnesses */}
            <div className="mt-12">
              <h4 className="font-bold text-gray-800 mb-4">WITNESSES:</h4>
              <div className="space-y-6">
                <div>
                  <p className="mb-1">1. Name: ________________________________</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">Seller ID</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Signature</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-1">2. Name: ________________________________</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">Seller ID</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Signature</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm italic text-gray-700">
                  <strong>Note:</strong> Signature of applicant on each and every page is mandatory.
                </p>
                <p className="text-sm italic text-gray-700 mt-1">
                  All documents must be self-attested.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Break for PDF */}
        <div className="page-break"></div>

        {/* Page 5 - Hindi Section */}
        <div className="p-8 avoid-page-break">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              <u>शपथ पत्र एवं घोषणा पत्र</u>
            </h1>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-justify">
              मैं ________________________________ पुत्र/पुत्री __________________________ सशपथ व शपथ करता हूँ
            </p>

            <div className="space-y-4">
              <p>
                <strong>(A)</strong> कि मेरा नाम ______________________________ पुत्र/पुत्री ______________________________ निवासी _________________________________________________________ हूँ.
              </p>

              <p>
                <strong>(B)</strong> यह कि मैं डायरेक्ट सेल्लिंग के कार्य में डायरेक्ट सेलर के रूप में {agreementData.companyName} कंपनी में दिनांक _________________ से कार्य कर रहा हूँ
              </p>

              <p>
                <strong>(C)</strong> यह कि मैंने कंपनी के साथ संपूर्ण शर्तो व निबंधनों के साथ डायरेक्ट सेलर एग्रीमेंट पर राजी खुशी, पूर्ण होशोहवाश व स्वस्थ चित्त मस्तिष्क के साथ हस्ताक्षर कर लिया है. मुझे इसमें कोई आपत्ति नहीं है. मेरा डायरेक्ट सेलर कोड ____________ है.
              </p>

              <p>
                <strong>(D)</strong> यह कि मैं और मेरे नीचे का कोई भी डायरेक्ट सेलर निम्न करने के लिए हमेशा प्रतिबद्ध रहेंगे:
              </p>

              <ol className="list-decimal pl-8 space-y-2">
                <li>यह कि जहाँ संविदा आरम्भ करने के 2 वर्षों के भीतर अथवा मेरे द्वारा की गयी अंतिम बिक्री कि तारीख से 2 वर्ष के भीतर कंपनी से बिक्री करने के लिए हमेशा प्रतिबद्ध रहेंगे</li>
                <li>यह कि बिक्री प्रस्तुतिकरण देते समय सर्वप्रथम अनुरोध के बिना सत्यता एवं स्पष्ट रूप से स्वयं की पहचान बताऊंगा, कंपनी की पहचान बताऊंगा</li>
                <li>यह कि प्रत्याशी उपभोक्ता को वस्तुओं के मूल्य साख की शर्तें, वापसी की नीतियां, गारंटी की शर्तें प्रदान करूंगा</li>
              </ol>
            </div>
          </div>

          {/* Page 5 Signature */}
          <div className="mt-16 pt-4 border-t border-gray-300">
            <div className="text-right">
              <p className="mb-2">Signature: ________________________</p>
              <p className="font-semibold text-gray-700">{agreementData.directSeller.name}</p>
              <p className="text-sm text-gray-600">Direct Seller</p>
            </div>
          </div>
        </div>

        {/* Page Break for PDF */}
        <div className="page-break"></div>

        {/* Page 6 - Hindi Continuation */}
        <div className="p-8 avoid-page-break">
          <div className="space-y-4">
            <p>
              <strong>(E)</strong> यह कि मैं लेखा की उचित पुस्तिका रखूंगा जिसमे उत्पादों के मूल्य, कर और मात्रा का व्योरा रहेगा
            </p>

            <p>
              <strong>(F)</strong> यह कि मैं निम्न कार्य नहीं करूंगा:
            </p>

            <ol className="list-decimal pl-8 space-y-2">
              <li>संभावित अथवा मौजूद प्रत्यक्ष विक्रेता या विक्रेताओं को या उपभोक्ता या संभावित उपभोक्ताओं को कंपनी के बारे में झूठा, गलत या भ्रामक प्रचार करना</li>
              <li>अपने साथी डायरेक्ट सेलर को दूसरी अन्य कंपनी में कार्य करने का लालच देना</li>
              <li>भ्रामक, कपटपूर्ण और/अथवा अनुचित व्यापर पद्धतियों का प्रयोग</li>
              <li>भ्रामक, झूठे, कपटपूर्ण और/अथवा अनुचित नियुक्ति पद्दतियों का प्रयोग</li>
            </ol>

            <p>
              <strong>(G)</strong> यह कि मेरे द्वारा उक्त पैरा (A) से (F) पैरा में वर्णित शपथ में कोई झूठ पाया गया जाता है या गलत वर्णन पाया जाता है तो कंपनी मुझे बिना नोटिस दिए मेरी संविदा रद्द कर सकती है
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="h-8 border-b border-gray-400 mb-2"></div>
                <p className="text-sm text-gray-600">शपथकर्ता</p>
              </div>
              <div>
                <div className="h-8 border-b border-gray-400 mb-2"></div>
                <p className="text-sm text-gray-600">सत्यापक</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-center italic mb-8">
                यह कि पैरा (A) से (G) को मैं पुरे होशोहवास में स्वस्थ चित्त व मस्तिष्क से पढ़ लिख व समझ कर हस्ताक्षरित व सत्यापित करता हूँ.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="text-right">
                <p className="mb-1">शपथकर्ता</p>
                <p className="text-sm text-gray-600"><u>गवाह</u></p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-1">1. नाम: _____________________</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">सेलर आई डी</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">हस्ताक्षर</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-1">2. नाम: _____________________</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">सेलर आई डी</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">हस्ताक्षर</p>
                      <div className="h-6 border-b border-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 6 Signature */}
          <div className="mt-16 pt-4 border-t border-gray-300">
            <div className="text-right">
              <p className="mb-2">Signature: ________________________</p>
              <p className="font-semibold text-gray-700">{agreementData.directSeller.name}</p>
              <p className="text-sm text-gray-600">Direct Seller</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-100 border-t border-gray-300">
          <div className="text-center">
            <p className="text-sm text-gray-600">Company Website:</p>
            <p className="font-semibold text-blue-600">{agreementData.website}</p>
            <p className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} {agreementData.companyName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
