import type { NextApiRequest, NextApiResponse } from 'next';
import Faq from '../../../models/faq';

const getFaq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const faq = await Faq.findAll();
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data FAQ.', error: (error as Error).message });
  }
};

export default getFaq;
