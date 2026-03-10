import ListPage from '@/components/features/ListPage';
import { getAllTreeAction } from '@/lib/actions/listAction';

interface Props {
    params: { slug: string };
}

const dynamic = "force-dynamic";

async function page({ params }: Props) {
      
    const { slug } = await params;

    const id = Number(slug);

    const lists = await getAllTreeAction(id)

    if (!lists) return

    return (
        <ListPage lists={lists} />
    )
}

export default page;