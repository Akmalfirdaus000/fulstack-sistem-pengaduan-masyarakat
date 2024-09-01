import type { NextApiRequest, NextApiResponse } from 'next';
import Faq from '../../../models/faq';

const getFaqById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const faq = await Faq.findByPk(id as string);
    if (faq) {
      res.status(200).json(faq);
    } else {
      res.status(404).json({ message: 'FAQ tidak ditemukan.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data FAQ.', error: (error as Error).message });
  }
};

export default getFaqById;
