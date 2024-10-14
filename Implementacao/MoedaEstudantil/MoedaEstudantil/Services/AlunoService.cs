using MoedaEstudantil.Data;
using MoedaEstudantil.Entities;

namespace MoedaEstudantil.Services
{
    public class AlunoService
    {
        private readonly MeritSystemContext _context;

        public AlunoService(MeritSystemContext context)
        {
            _context = context;
        }

        public Aluno CadastrarAluno(Aluno aluno)
        {
            _context.Alunos.Add(aluno);
            _context.SaveChanges();
            return aluno;
        }

        public Aluno ObterAluno(int id)
        {
            return _context.Alunos.Find(id);
        }

        public Aluno AtualizarAluno(int id, Aluno alunoAtualizado)
        {
            var aluno = _context.Alunos.Find(id);
            if (aluno == null) return null;

            aluno.Nome = alunoAtualizado.Nome;
            aluno.Email = alunoAtualizado.Email;
            aluno.CPF = alunoAtualizado.CPF;
            aluno.RG = alunoAtualizado.RG;
            aluno.Endereco = alunoAtualizado.Endereco;
            aluno.InstituicaoEnsino = alunoAtualizado.InstituicaoEnsino;
            aluno.Curso = alunoAtualizado.Curso;

            _context.SaveChanges();
            return aluno;
        }

        public bool DeletarAluno(int id)
        {
            var aluno = _context.Alunos.Find(id);
            if (aluno == null) return false;

            _context.Alunos.Remove(aluno);
            _context.SaveChanges();
            return true;
        }

        public List<Aluno> ObterTodosAlunos()
        {
            return _context.Alunos.ToList();
        }
    }
}

