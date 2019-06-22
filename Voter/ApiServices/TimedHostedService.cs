using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Voter.DAL;
using Voter.Models;

namespace Voter.ApiServices
{
    internal class TimedHostedService : IHostedService, IDisposable
    {
        private readonly ILogger _logger;
        private Timer _timer;
        private IServiceScopeFactory _serviceScopeFactory;
        public TimedHostedService(ILogger<TimedHostedService> logger, IServiceScopeFactory serviceScopeFactory)
        {
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed Background Service is starting.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(10));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                _logger.LogInformation("Timed Background Service is working.");

                var context = scope.ServiceProvider.GetService<AuthenticationContext>();
                var expiredResolutions = context.Resolutions.Where(r => r.ExpirationDate <= DateTime.Now).ToList();

                foreach (var resolution in expiredResolutions)
                {
                    var votes = context.ResidentResolution.Where(rr => rr.ResolutionId == resolution.Id);
                    var forVotes = votes.Where(v => v.Answer == ActAnswer.For).Count();
                    var againstVotes = votes.Where(v => v.Answer == ActAnswer.Against).Count();
                    if (forVotes > againstVotes)
                    {
                        resolution.ResolutionStatus = ResolutionStatus.Accepted;
                    }
                    else
                    {
                        resolution.ResolutionStatus = ResolutionStatus.Rejected;

                    }

                }
                context.SaveChanges();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed Background Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
